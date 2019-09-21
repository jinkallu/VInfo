<script>
  import PreviewItem from "./PreviewItem.svelte";

  import { onMount, onDestroy, beforeUpdate, createEventDispatcher } from "svelte";
  import nodestore from "../../store/selfstore.js";

  //import PreviewCarousel from "../UI/PreviewCarousel.svelte";

  let sibblings;
  let previewData;
  let self;
  let view_data = [];
  let unsubscribeSibblings;
  let unsubscribeSelf;
  let unsubscribePreview;

  export let previewFull;

  $: height = previewFull? '100%' : '30%';

  const dispatch = createEventDispatcher();

  unsubscribeSibblings = nodestore.subscribeSibblings(items => {
    if (items) {
      sibblings = items;
    } else {
      sibblings = [];
    }
  });


  unsubscribePreview = nodestore.subscribePreview(items => {
    if (items) {
      previewData = items;
    } else {
      previewData = [];
    }
  });

  unsubscribeSelf = nodestore.subscribeSelf(items => {
    if (items) {
      self = items;
    } else {
      self = [];
    }
  });

  onDestroy(() => {
    if (unsubscribeSibblings) {
      unsubscribeSibblings();
    }
    if (unsubscribeSelf) {
      unsubscribeSelf();
    }

    if(unsubscribePreview){
      unsubscribePreview();
    }
  });

  function onclicked(event) {
   /* if (!event.detail.focus) {
      let clickedSelf = sibblings.find(
        node => node.nodeid == event.detail.nodeid
      );
      nodestore.onSideClicked(clickedSelf, sibblings);
    } else {
      console.log("Show full page of focus");
    }*/
    console.log("Show full page of focus");
    dispatch('toggle');
  }
</script>

<style>
  .toper {
    display: flex;
    flex-direction: row;
    width: 100%;
    background: white;
    border: 0.2em solid blue;
  }
</style>

<!--
{#if sibblings}
  <div class="toper">
    {#each sibblings as sibbling (sibblings.nodeid)}
      <PreviewItem
        preview={sibbling}
        self={self.nodeid}
        on:side={onsideclicked} />

    {/each}
    
  </div>
{/if}
-->

{#if self}
  <div class="toper" style = "height: {height}">
    <PreviewItem
        preview={self}
        self={self.nodeid}
        previewData={previewData}
        on:click={onclicked} 
        />
  </div>
{/if}
