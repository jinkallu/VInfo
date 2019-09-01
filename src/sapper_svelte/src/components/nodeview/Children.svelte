<script>
    import ChildrenView from '../UI/ChildrenView.svelte';
    import nodestore from '../nodestore/nodestore.js';
    import {onDestroy} from "svelte";

    export let size_data;
    let view_data = [];


    const unsubscribe = nodestore.subscribe(items => {
        if(items){
            if(items.children)
            {
                childrenPos (items.children);
            }
            else{
                view_data = null;
            }
        }
        else{
            view_data = null;
        }
    });

    onDestroy( () => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    function childrenPos(children)
    {
        let tmp_view_data = [];
        for(let i = 0; i < children.length; i++)
        {
            tmp_view_data.push({
                rx: size_data[0].rx + i * (size_data[0].width + 10) - ((children.length - 1) * (size_data[0].width + 10) / 2),
                ry: size_data[0].ry,
                width: size_data[0].width,
                height: size_data[0].height,
                color: size_data[0].color,
                name: children[i].nodename,
                nodeid: children[i].nodeid
            });
        }

        view_data = tmp_view_data;
    }



    function handleClick(event) {
        nodestore.getFull({nodeid:event.detail.nodeid,
                       op: event.detail.op
            });
    }
</script>

{#if view_data}
    {#each view_data as d}
        <ChildrenView data = {d} on:click={handleClick}/>
    {/each}
{/if}
