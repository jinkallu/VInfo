<script>
  import FullPageView from "./FullPageView.svelte";

  import { onMount, onDestroy, beforeUpdate, createEventDispatcher } from "svelte";
  import nodestore from "../../store/selfstore.js";

  //import PreviewCarousel from "../UI/PreviewCarousel.svelte";

  let sibblings;
  let self;
  let view_data = [];
  let unsubscribeSibblings;
  let unsubscribeSelf;

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

    background: white;
    border: 0.2em solid blue;
    height: 100%;
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
    <FullPageView
        preview={self}
        self={self.nodeid}
        on:click={onclicked} 
        />
  </div>
{/if}
