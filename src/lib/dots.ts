import oklchToRgb from "@lib/oklchToRgb.glsl?raw";
import vertexShaderSrc from "@lib/dotsVert.glsl?raw";
import rawFragment from "@lib/dotsFrag.glsl?raw";

const MOUSE_RADIUS = 150;

export class DotCanvas {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;
  private positionBuffer: WebGLBuffer;
  constructor(canvas: HTMLCanvasElement) {
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

  render({ isDarkMode, mouseX, mouseY, box, delta }: RenderProps) {
    const uResolution = this.gl.getUniformLocation(
      this.program,
      "u_resolution",
    )!;
    const uMouse = this.gl.getUniformLocation(this.program, "u_mouse")!;
    const uRadius = this.gl.getUniformLocation(this.program, "u_radius")!;
    const uDark = this.gl.getUniformLocation(this.program, "u_dark")!;
    const uBox = this.gl.getUniformLocation(this.program, "u_box")!;
    const uBoxBrightness = this.gl.getUniformLocation(
      this.program,
      "u_boxBrightness",
    )!;

    if (box) {
      const { left, right, top, bottom } = box;
      this.gl.uniform4f(
        uBox,
        left,
        bottom + window.scrollY,
        right,
        top + window.scrollY,
      );
      this.boxBrightness = Math.min(this.boxBrightness + delta, 1.0);
    } else {
      this.boxBrightness = Math.max(this.boxBrightness - delta, 0.0);
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
    this.gl.uniform2f(uMouse, mouseX + window.scrollX, mouseY + window.scrollY);
    this.gl.uniform1i(uDark, isDarkMode ? 1 : 0);

    this.gl.drawArrays(this.gl.POINTS, 0, this.positions.length / 2);
  }
}

export interface Box {
  left: number;
  bottom: number;
  right: number;
  top: number;
}

export interface RenderProps {
  isDarkMode: boolean;
  mouseX: number;
  mouseY: number;
  delta: number;
  box: Box | null;
}
