<script>
  import { createQrSvgString, createQrSvgDataUrl } from "@svelte-put/qr";

  let data = $state("https://jackhogan.me");

  $effect(() => {
    const config = { data };
    dataURL = createQrSvgDataUrl(config);
    svgString = createQrSvgString(config);
  });

  let dataURL = $state("");
  let svgString = $state("");
</script>

<div class="flex flex-col items-center gap-2 md:w-1/2 p-3">
  <label for="url-input">Enter URL:</label>
  <input type="text" id="url-input" bind:value={data} placeholder="Enter URL" />
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html svgString}
  <a
    class="p-1 hover:text-green-400 outline outline-1 rounded"
    href={dataURL}
    download="qr.svg">Download QR as SVG</a
  >
</div>
