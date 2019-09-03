<script>
    import nodestore from '../nodestore/nodestore.js';
    import {onDestroy} from "svelte";
    import SelfAndSibblingsNorm from './SelfAndSibblingsNorm.svelte';
    import SelfAndSibblingsCarousel from './SelfAndSibblingsCarousel.svelte';

    export let size_data;
    let sibblings;
    let self;
    let view_data = [];

    const unsubscribe = nodestore.subscribe(items => {
        sibblings = [];
        self = [];
        if(items){
            if(items.sibblings)
            {
                sibblings = items.sibblings;
            }
            if(items.self)
            {
                self = items.self;
            }
        }
    });

    onDestroy( () => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    function handleClick(event) {
        if(!event.detail.focus)
        {
            nodestore.getFull({nodeid:event.detail.nodeid,
                               op: 'FOCUS'
                                });
        }
        else{
            console.log('Show full page of focus');
        }
    }

</script>

{#if sibblings.length > 0 && self}
    <SelfAndSibblingsNorm {sibblings} {self} {size_data} />
    <SelfAndSibblingsCarousel {sibblings} {self} {size_data} on:click={handleClick}/>
{/if}
