<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  import nodestore from "../../selfstore.js";

  const dispatch = createEventDispatcher();

  let unsubscribeParent;
  let unsubscribeSibblings;

  let parent;
  let sibblings;

  onMount(() => {
    unsubscribeParent = nodestore.subscribeParent(items => {
      parent = items;
    });

    unsubscribeSibblings = nodestore.subscribeSibblings(items => {
      sibblings = items;
    });
  });

  onDestroy(() => {
    if (unsubscribeParent) {
      unsubscribeParent();
    }
    if (unsubscribeSibblings) {
      unsubscribeSibblings();
    }
  });

  function ontopclicked(nodeid) {
    if(parent.pnodeid)
    {
      console.log("ontop clicked");
      nodestore.onTopClicked(parent, sibblings, nodeid);
    }
  }
</script>

<style>
  #circle {
    display: flex;
    flex-direction: column;
    background: navy;
    width: 128px;
    height: 128px;
    border-radius: 64px;
    text-align: center;
    justify-content: center;
    align-items: center;
  }

  #circle div {
    position: relative;
    color: white;
  }

</style>

{#if parent}
  <div 
      id="circle"
      on:click={() => ontopclicked(parent.nodeid)}
      >
    <div>
      {parent.nodename}
      <!--<Badge>{parent.nodename}</Badge>-->
    </div>
<!--
    {#if parent.pnodeid}
      <div>
        <Button
          mode="outline"
          type="button"
          on:click={() => ontopclicked(parent.nodeid)}>
          VIEW
        </Button>
      </div>
    {/if} -->

  </div>
{/if}
