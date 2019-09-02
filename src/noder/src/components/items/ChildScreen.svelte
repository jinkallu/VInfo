<script>
  import { onMount, onDestroy } from "svelte";
  import nodestore from "../../selfstore.js";
  import ChildItem from "./ChildItem.svelte";

  let unsubscribeChildren;
  let unsubscribeSelf;
  let children = [];
  let self = [];

  onMount(() => {
    unsubscribeChildren = nodestore.subscribeChildren(items => {
      children = items;
    });
     unsubscribeSelf = nodestore.subscribeSelf(items => {
      self = items;
    });
  });

  function onbottomclicked(event) {
    console.log("bottom clicked");

    // parent.set(loadedself);
    let clickedSelf = children.find(node => node.nodeid == event.detail);
    nodestore.onBottomClicked(self,clickedSelf,children);
  }

  onDestroy(() => {
    if (unsubscribechildren) {
      unsubscribechildren();
    }
    if (unsubscribeSelf) {
      unsubscribeSelf();
    }
  });
</script>

<style>
  .toper {
    display: flex;
    flex-direction: row;

    background: lightskyblue;
  }
</style>

<div class="toper">
  {#if children}
    {#each children as child (children.nodeid)}
      <ChildItem {child} on:bottom={onbottomclicked} />
      <!-- </div> -->
    {/each}
  {/if}
</div>
