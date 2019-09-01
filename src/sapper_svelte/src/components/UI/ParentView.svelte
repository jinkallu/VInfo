<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let data;
</script>

<style>
    .level0 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:Navy;
        color: white;
        position:absolute;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
</style>
{#each data as d}
    <div class = "level0"
         style="left: {d.rx + 'px'};
                top: {d.ry + 'px'};
                width: {d.width + 'px'};
                height: {d.height + 'px'};
                background-color: {d.color}"
         on:click="{() => {dispatch('click', {nodeid: d.nodeid, op: 'FOCUS'})}}"
    >
        {d.name}
    </div>
{/each}
