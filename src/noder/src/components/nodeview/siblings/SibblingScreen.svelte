<script>
  import SibblingItem from "./SibblingItem.svelte";
  //import SibblingsCarousel from "../../../UI/SibblingsCarousel.svelte";
  import SiblingsView from "../../UI/SiblingsView.svelte";

  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import nodestore from "../../store/selfstore.js";

  let siblings;
  let self;
  let unsubscribeSibblings;
  let unsubscribeSelf;

  onMount(() => {
    unsubscribeSibblings = nodestore.subscribeSibblings(items => {
      siblings = items;
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
    if (self.nodeid !== event.detail.nodeid) {
      let clickedSelf = siblings.find(
        node => node.nodeid == event.detail.nodeid
      );
      nodestore.onSideClicked(clickedSelf, siblings);
    }
  }
</script>

<style>
  .toper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: white;
  }
</style>

{#if siblings}
  <div class="toper">
    <!--
    {#each sibblings as sibbling (sibblings.nodeid)}
      <SibblingItem {sibbling} selfId={self.nodeid} on:side={onsideclicked} />
    {/each}
    -->
    <SiblingsView {siblings}  selfId={self.nodeid} on:side={onsideclicked} />
    <!--

    <SibblingsCarousel data = {sibblings} selfId={self.nodeid} on:side={onsideclicked}/>
  -->
  </div>
{/if}
