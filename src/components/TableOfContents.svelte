<script lang="ts">
  import type { MarkdownHeading } from "astro";

  const { headings }: { headings: MarkdownHeading[] } = $props();
  const useHeadings = $derived(
    headings.filter((h) => !(h.text == "Footnotes" && h.depth == 2)),
  );

  let show = $state(false);
</script>

<div class="flex flex-col border-2 border-black p-2 m-1 dark:border-white">
  <button
    class="flex items-start justify-between cursor-pointer"
    onclick={(_) => (show = !show)}
  >
    <p><strong>Table of Contents</strong></p>
    <p>{show ? "↑" : "↓"}</p>
  </button>
  {#if show}
    <div class="mt-1 flex flex-col">
      {#each useHeadings as heading}
        <a
          style="margin-left: {0.25 * 2 * (heading.depth - 1)}rem;"
          class="underline hover:decoration-2 my-0.5"
          href="#{heading.slug}">{heading.text}</a
        >
      {/each}
    </div>
  {/if}
</div>
