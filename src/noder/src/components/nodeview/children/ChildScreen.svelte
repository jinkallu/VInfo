<script>
  import { onMount, onDestroy } from "svelte";
  import nodestore from "../../store/selfstore.js";
  import ChildItem from "./ChildItem.svelte";
  import ChildrenView from "./ChildrenView.svelte";

  //  import ChildrenCarousel from "../UI/ChildrenCarousel.svelte";

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

    background: white;
  }
</style>

<div class="toper">
  {#if children}
          <!--

    {#each children as child (children.nodeid)}
      <ChildItem {child} on:bottom={onbottomclicked} />
    {/each} 

    <ChildrenCarousel data = {children} on:bottom={onbottomclicked}/>
    -->
        <ChildrenView {children} on:bottom={onbottomclicked} />
  {/if}
</div>
