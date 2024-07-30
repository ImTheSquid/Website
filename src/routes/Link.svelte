<script lang="ts">
    import './styles.css';
    import type LinkData from '$lib/Link';

    export let link: LinkData;
</script>

<a href={link.destination} target="_blank">
    <div class="card glassBackground">
        <slot />
        <h3>{link.name}</h3>
    </div>
</a>

<style>
    div {
        padding: 1em 2em 0 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 120px;
        height: auto;
    }

    a {
        margin: 1em;
    }

    @media (max-width: 1000px) {
        div {
            width: 50%;
        }
    }
</style>