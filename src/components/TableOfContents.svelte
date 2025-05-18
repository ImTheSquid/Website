<script lang="ts">
  import type { MarkdownHeading } from "astro";

  const { headings }: { headings: MarkdownHeading[] } = $props();

  let show = $state(false);
</script>

<div class="flex flex-col border border-black p-2 m-1">
  <button
    class="flex items-start justify-between"
    onclick={(_) => (show = !show)}
  >
    <p><strong>Table of Contents</strong></p>
    <p>{show ? "↑" : "↓"}</p>
  </button>
  {#if show}
    <div class="mt-1 flex flex-col">
      {#each headings as heading}
        <a
          class="ml-{2 *
            (heading.depth - 1)} underline hover:decoration-2 my-0.5"
          href="#{heading.slug}">{heading.text}</a
        >
      {/each}
    </div>
  {/if}
</div>
