import oklchToRgb from "@lib/oklchToRgb.glsl?raw";
import vertexShaderSrc from "@lib/dotsVert.glsl?raw";
import rawFragment from "@lib/dotsFrag.glsl?raw";

const MOUSE_RADIUS = 150;

interface Size {
  width: number;
  height: number;
}

export interface Box {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export class DotCanvas {
  private canvas: HTMLCanvasElement | OffscreenCanvas;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private positionBuffer: WebGLBuffer;
  private lastCanvasSize: Size;
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas) {
    this.canvas = canvas;
    const g = this.canvas.getContext("webgl");
    if (!g) {
      throw new Error("OpenGL support missing!");
    }
    this.gl = g;

    // Fragment shader source
    const fragmentShaderSrc = rawFragment.replace("#include oklch", oklchToRgb);

    // Create WebGL program
    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSrc,
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSrc,
    );

    if (!(vertexShader && fragmentShader)) {
      throw new Error("unable to create shaders!");
    }

    this.program = this.gl.createProgram();
    this.gl.attachShader(this.program, vertexShader);
    this.gl.attachShader(this.program, fragmentShader);
    this.gl.linkProgram(this.program);
    if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
      console.error(
        "Program link failed:",
        this.gl.getProgramInfoLog(this.program),
      );
      throw new Error("Failed to link program");
    }
    this.gl.useProgram(this.program);

    this.positionBuffer = this.gl.createBuffer();

    this.lastCanvasSize = {
      width: this.canvas.width,
      height: this.canvas.height,
    };

    this.generateDots();
  }

  // Compile shader
  createShader(type: number, source: string) {
    const shader = this.gl.createShader(type);
    if (!shader) {
      throw new Error("unable to create shader!");
    }
    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      console.error("Shader compile failed:", this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private positions: number[] = [];
  private animatedBox: Box | null = null;
  private targetBox: Box | null = null;

  private lerp(current: number, target: number, factor: number): number {
    return current + (target - current) * factor;
  }

  generateDots() {
    // Create grid of dot positions
    const DOT_SPACING = 40;
    this.positions = [];
    for (let x = DOT_SPACING / 2; x < this.canvas.width; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < this.canvas.height; y += DOT_SPACING) {
        this.positions.push(x, y);
      }
    }

    // Upload positions to GPU
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      new Float32Array(this.positions),
      this.gl.STATIC_DRAW,
    );

    const aPosition = this.gl.getAttribLocation(this.program, "a_position");

    this.gl.enableVertexAttribArray(aPosition);
    this.gl.vertexAttribPointer(aPosition, 2, this.gl.FLOAT, false, 0, 0);
  }

  private boxBrightness: number = 0;

  render({
    isDarkMode,
    mouseX,
    mouseY,
    box,
    delta,
    useColor,
    scrollOffsetX,
    scrollOffsetY,
  }: RenderProps) {
    const uResolution = this.gl.getUniformLocation(
      this.program,
      "u_resolution",
    )!;
    const uMouse = this.gl.getUniformLocation(this.program, "u_mouse")!;
    const uRadius = this.gl.getUniformLocation(this.program, "u_radius")!;
    const uDark = this.gl.getUniformLocation(this.program, "u_dark")!;
    const uColor = this.gl.getUniformLocation(this.program, "u_color")!;
    const uBox = this.gl.getUniformLocation(this.program, "u_box")!;
    const uScrollOffset = this.gl.getUniformLocation(
      this.program,
      "u_scrollOffset",
    )!;
    const uBoxBrightness = this.gl.getUniformLocation(
      this.program,
      "u_boxBrightness",
    )!;

    if (
      this.lastCanvasSize.width !== this.canvas.width ||
      this.lastCanvasSize.height !== this.canvas.height
    ) {
      this.lastCanvasSize = {
        width: this.canvas.width,
        height: this.canvas.height,
      };
      this.generateDots();
    }

    this.gl.uniform2f(uScrollOffset, scrollOffsetX, scrollOffsetY);

    // Update target box
    this.targetBox = box ? { ...box } : null;

    // Animation easing factor - higher = faster transition
    // Using frame-rate independent easing: 1 - (1 - speed)^delta
    // Clamp delta to prevent corruption from timing edge cases
    const clampedDelta = Math.max(0, Math.min(delta, 0.1));
    const speed = 0.15;
    const easeFactor = 1 - Math.pow(1 - speed, clampedDelta * 60);

    if (this.targetBox) {
      if (this.animatedBox) {
        this.animatedBox.left = this.lerp(this.animatedBox.left, this.targetBox.left, easeFactor);
        this.animatedBox.right = this.lerp(this.animatedBox.right, this.targetBox.right, easeFactor);
        this.animatedBox.top = this.lerp(this.animatedBox.top, this.targetBox.top, easeFactor);
        this.animatedBox.bottom = this.lerp(this.animatedBox.bottom, this.targetBox.bottom, easeFactor);
      } else {
        // Initialize animated box at target position
        this.animatedBox = { ...this.targetBox };
      }
      this.boxBrightness = Math.min(this.boxBrightness + clampedDelta, 1.0);
    } else {
      // No target - fade out brightness but keep animatedBox for smooth transition
      this.boxBrightness = Math.max(this.boxBrightness - clampedDelta, 0.0);
      // Clear animatedBox when fully faded out
      if (this.boxBrightness <= 0) {
        this.animatedBox = null;
      }
    }

    // Use animated box coordinates for rendering
    if (this.animatedBox) {
      const { left, right, top, bottom } = this.animatedBox;
      this.gl.uniform4f(uBox, left, bottom, right, top);
    }

    this.gl.uniform1f(uBoxBrightness, this.boxBrightness);

    this.gl.uniform1f(uRadius, MOUSE_RADIUS);

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.uniform2f(uResolution, this.canvas.width, this.canvas.height);
    if (isDarkMode) {
      this.gl.clearColor(0.0117647059, 0.0274509804, 0.0705882353, 1.0);
    } else {
      this.gl.clearColor(0.9764705882, 0.9803921569, 0.9843137255, 1.0);
    }
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.uniform2f(uMouse, mouseX, mouseY);
    this.gl.uniform1i(uDark, isDarkMode ? 1 : 0);
    this.gl.uniform1i(uColor, useColor ? 1 : 0);

    this.gl.drawArrays(this.gl.POINTS, 0, this.positions.length / 2);
  }
}

export interface RenderProps {
  isDarkMode: boolean;
  mouseX: number;
  mouseY: number;
  delta: number;
  box: Box | null;
  useColor: boolean;
  scrollOffsetX: number;
  scrollOffsetY: number;
}
