<script>
    import ParentView from '../UI/ParentView.svelte';
    import nodestore from '../nodestore/nodestore.js';
    import {onDestroy} from "svelte";


    export let size_data;
    let view_data = [];

    nodestore.getFull({nodeid:null, op: 'FOCUS'});


    const unsubscribe = nodestore.subscribe(items => {
        if(items){
            if(items.parent)
            {
                parentPos(items.parent);
            }
        }
    });

    onDestroy( () => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    function parentPos(parent)
    {
        let tmp_view_data = [];
        tmp_view_data.push({
            rx: size_data[0].rx,
            ry: size_data[0].ry,
            width: size_data[0].width,
            height: size_data[0].height,
            color: size_data[0].color,
            name: parent.nodename,
            nodeid: parent.nodeid
        });

        view_data = tmp_view_data;
    }

    function handleClick(event) {
        nodestore.getFull({nodeid:event.detail.nodeid,
                       op: event.detail.op
            });
    }
</script>

<ParentView data = {view_data} on:click={handleClick}/>
