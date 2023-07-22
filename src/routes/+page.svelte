<script>
	import Counter from './Counter.svelte';
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>Jack Hogan</title>
	<meta name="description" content="Jack's Portfolio" />
</svelte:head>

<section>
	<h1>
		Jack's Portfolio
	</h1>

	<h2>
		This site is a placeholder until I get more time to put into it. Check out my <a href="https://github.com/ImTheSquid" target="_blank" rel="noopener noreferrer">GitHub</a> or have some fun with the counter!
	</h2>

	<Counter />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}
</style>
