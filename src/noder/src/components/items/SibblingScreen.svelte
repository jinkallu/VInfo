<script>
  import SibblingItem from "./SibblingItem.svelte";

  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import nodestore from "../../selfstore.js";

  let sibblings;
  let self;
  let unsubscribeSibblings;
  let unsubscribeSelf;

  onMount(() => {
    unsubscribeSibblings = nodestore.subscribeSibblings(items => {
      sibblings = items;
    });

    unsubscribeSelf = nodestore.subscribeSelf(items => {
      self = items;
    });
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
      console.log(event.detail.nodeid + "first clicked nodeid");

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

{#if sibblings}
  <div class="toper">
    {#each sibblings as sibbling (sibblings.nodeid)}
      <SibblingItem {sibbling} selfId={self.nodeid} on:side={onsideclicked} />

      <!-- <div id="circle"> -->

      <!-- </div> -->
    {/each}
  </div>
{/if}
