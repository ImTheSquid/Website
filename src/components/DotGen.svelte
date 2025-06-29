<script lang="ts">
  import { DotCanvas } from "@lib/dots";
  import { onMount } from "svelte";
  let width: number = $state(200);
  let height: number = $state(200);
  let mouseX: number = $state(-1000);
  let mouseY: number = $state(-1000);
  let isDarkMode: boolean = $state(false);
  let blur: number = $state(7);
  let c: DotCanvas | null = $state(null);
  let canv: OffscreenCanvas | null = $state(null);

  $effect(() => {
    width = Math.max(width, 1);
    height = Math.max(height, 1);
    blur = Math.max(blur, 0);

    if (c && canv) {
      canv.width = width;
      canv.height = height;
      c.render({
        isDarkMode,
        mouseX,
        mouseY,
        delta: 1,
        box: null,
        useColor: true,
      });

      const bcanvas = document.getElementById("genblur") as HTMLCanvasElement;
      // bcanvas.width += 2 * blur;
      // bcanvas.height += 2 * blur;
      const ctx = bcanvas.getContext("2d")!;
      ctx.clearRect(0, 0, bcanvas.width, bcanvas.height);
      if (isDarkMode) {
        ctx.fillStyle = "color: #030712;";
      } else {
        ctx.fillStyle = "color: #f9fafb";
      }
      ctx.fillRect(0, 0, bcanvas.width, bcanvas.height);
      ctx.filter = `blur(${blur}px)`;
      ctx.drawImage(canv.transferToImageBitmap(), 0, 0);
    }
  });

  onMount(() => {
    canv = new OffscreenCanvas(width, height);
    c = new DotCanvas(canv);
    c.render({
      isDarkMode,
      mouseX,
      mouseY,
      delta: 1,
      box: null,
      useColor: true,
    });
  });

  function canvasMouseDown(e: MouseEvent) {
    mouseX = e.offsetX;
    mouseY = e.offsetY;
  }

  function resetMouse() {
    mouseX = -1000;
    mouseY = -1000;
  }

  function download() {
    const link = document.createElement("a");
    link.download = "canvas-image.png";
    link.href = (
      document.getElementById("genblur") as HTMLCanvasElement
    ).toDataURL("image/png");
    link.click();
  }
</script>

<label>
  WIDTH: <input type="number" bind:value={width} />
</label>
<label>
  HEIGHT: <input type="number" bind:value={height} />
</label>
<label>
  BLUR RADIUS: <input type="number" bind:value={blur} />
</label>
<button
  onclick={resetMouse}
  class="p-1 hover:text-green-400 outline outline-1 rounded"
>
  RESET MOUSE
</button>
<label> DARK MODE: <input type="checkbox" bind:checked={isDarkMode} /></label>
<button
  onclick={download}
  class="p-1 hover:text-green-400 outline outline-1 rounded">DOWNLOAD</button
>

<canvas {width} {height} id="genblur" onmousedown={canvasMouseDown}></canvas>
