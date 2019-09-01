<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let data;
</script>

<style>
    .level2 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:blue;
        color: white;
        position:absolute;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
</style>
{#if data}
    <div class = "level2"
         style="left: {data.rx + 'px'};
                top: {data.ry + 'px'};
                width: {data.width + 'px'};
                height: {data.height + 'px'};
                background-color: {data.color}"
         on:click="{() => {dispatch('click', {nodeid: data.nodeid, op: 'FOCUS'})}}"
    >
        {data.name}
    </div>
{/if}
