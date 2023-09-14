<script lang="ts">
    import './styles.css';
    import type ProjectTileData from "$lib/ProjectTile";

    export let project: ProjectTileData;
</script>

<a href={project.link} target="_blank">
<div class="card ">
    <img src={project.image} alt={project.imageAlt}/>
    <h3>{@html project.title}</h3>
    <p>{@html project.description}</p>
</div>
</a>

<style>
    h3 {
        font-size: 1.5em;
    }

    div * {
        margin: 0.1em;
    }

    img {
        width: 100%;
        height: 100%;
        clip-path: inset();
        object-fit: cover;
        border-radius: 16px;
        margin-bottom: .4em;
    }

    a {
        text-decoration: none;
        margin: 2em;
    }
</style>