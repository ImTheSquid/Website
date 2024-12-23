<script lang="ts">
  const { path }: { path: string } = $props();

  interface Page {
    name: string;
    route: string;
    match?: string;
  }

  const pages: Page[] = [
    { name: "Me", route: "/" },
    { name: "Work", route: "/work" },
    { name: "Blog", route: "/blog", match: "/blog(/tag:.+)?" },
  ];
</script>

<span class="flex flex-row text-2xl mb-5">
  {#each pages as { name, route, match }, i}
    {#if !path.match(`^${match || route}/?$`)}
      <a href={route} class="hover:underline">{name}</a>
    {:else}
      <p class="font-bold">{name}</p>
    {/if}
    {#if i < pages.length - 1}
      <p class="mx-3 font-bold">/</p>
    {/if}
  {/each}
</span>
