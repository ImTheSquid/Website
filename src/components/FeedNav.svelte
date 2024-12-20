<script lang="ts">
  const { path }: { path: string } = $props();

  interface Page {
    name: string;
    route: string;
  }

  const pages: Page[] = [
    { name: "Me", route: "/" },
    { name: "Work", route: "/work" },
    { name: "Blog", route: "/blog" },
  ];
</script>

<span class="flex flex-row text-2xl mb-5">
  {#each pages as { name, route }, i}
    {#if !path.match(`^${route}/?$`)}
      <a href={route} class="underline">{name}</a>
    {:else}
      <p class="font-bold">{name}</p>
    {/if}
    {#if i < pages.length - 1}
      <p class="mx-3 font-bold">/</p>
    {/if}
  {/each}
</span>
