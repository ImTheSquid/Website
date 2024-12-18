<script lang="ts">
  const { path }: {path: string} = $props();

  interface Page {
    name: string;
    route: string;
  }

  const pages: Page[] = [{name: "Me", route: "/"}, {name: "Work", route: "/work"}, {name: "Blog", route: "/blog"}];
</script>
<span class="flex flex-row text-3xl mb-5">
{#each pages as {name, route}, i}
    <a href={route} class="{path === route ? 'font-bold' : 'underline'}">{name}</a>
    {#if i < pages.length - 1}
        <p class="mx-3 font-bold">/</p>
        {/if}
{/each}
</span>
