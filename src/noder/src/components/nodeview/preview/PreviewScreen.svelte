<script>
  import PreviewItem from "./PreviewItem.svelte";

  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import nodestore from "../../store/selfstore.js";

  //import PreviewCarousel from "../UI/PreviewCarousel.svelte";

  let sibblings;
  let self;
  let view_data = [];
  let unsubscribeSibblings;
  let unsubscribeSelf;

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

  function onsideclicked(event) {
    if (!event.detail.focus) {
      let clickedSelf = sibblings.find(
        node => node.nodeid == event.detail.nodeid
      );
      nodestore.onSideClicked(clickedSelf, sibblings);
    } else {
      console.log("Show full page of focus");
    }
  }
</script>

<style>
  .toper {
    display: flex;
    flex-direction: row;

    background: lightskyblue;
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
  <div class="toper">
    <PreviewItem
        preview={self}
        self={self.nodeid}
        on:side={onsideclicked} />
  </div>
{/if}
