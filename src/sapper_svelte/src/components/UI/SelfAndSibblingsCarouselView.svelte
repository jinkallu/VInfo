<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function click (nodeid, focus)
    {
        //console.log('Focus ' + focus);
        dispatch('click', {
                nodeid: nodeid,
                focus: focus
            }
        );
    };

    export let data;

</script>

<style>
    .preview {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:blue;
        color: white;
        position:absolute;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
</style>
{#each data as d, i}
    <div class = "preview"
         style="left: {d.rx + 'px'};
                top: {d.ry + 'px'};
                width: {d.width + 'px'};
                height: {d.height + 'px'};
                background-color: {d.color}"

         on:click={click.bind(this, d.nodeid, d.focus)}
    >
        {d.nodename}
    </div>
{/each}
