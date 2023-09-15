<script>
// @ts-nocheck

    import purdue from '$lib/images/purdue.png';
	import svelte from '$lib/images/svelte-logo.svg';
    import './styles.css';
</script>

<footer>
    <p>Made with ❤️ and GRIT™ at <img src={purdue} alt="Purdue Logo" style="margin: .25rem 0;"/> with <img src={svelte} alt="Svelte Logo" style="height: 1.3em"/> & <svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24" style="color:var(--geist-foreground);width:24px;height:24px"><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg></p>
</footer>

<style>
    footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	p {
        padding: 1em;
		display: inline-flex;
        justify-content: center;
        align-items: center;
        /* From https://css.glass */
		background: rgba(255, 255, 255, 0.23);
		border-radius: 50px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3.4px);
		-webkit-backdrop-filter: blur(3.4px);
		border: 1px solid rgba(255, 255, 255, 0.33);
        user-select: none;
		-webkit-user-select: none;
	}

    p:hover {
	    -webkit-animation: vibrate-1 0.3s linear infinite both;
	    animation: vibrate-1 0.3s linear infinite both;
    }

	p img,svg {
		width: auto;
		height: .9em;
		padding: 0 .5rem;
	}

	@media (min-width: 1000px) {
		footer {
			padding: 12px 0;
		}
	}
</style>