<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
 
  export let sibbling;
  export let selfId;
  let isSelf = false;

  let isLoading = false;
  onMount(() => {
    if (sibbling.nodeid === selfId) {
      isSelf = true;
      console.log(sibbling.nodename);
    } else {
      isSelf = false;
    }
  });

  const dispatch = createEventDispatcher();

  function loadData(nodeid) {
    console.log(nodeid + "while clicking nodeid");
    if (!isSelf) {
      dispatch("side", {
        nodeid: nodeid,
        focus: event.detail.focus
      });
    }
  }
</script>

<style>
  .clickable {
    background: bisque;
  }
  .clickable:hover {
    background: yellowgreen;
  }

  #sibbling {
    width: 128px;
    height: 60px;
    border-radius: 5px;
    border: 2px solid orange;
  }

 
</style>

<!-- <article> -->
{#if !isSelf}
  <div
    id="sibbling"
    class="clickable"
    on:click={() => loadData(sibbling.nodeid)}>
    <div class="chip">
      <Badge>{sibbling.nodename}</Badge>
      
    </div>

  </div>
{:else}
  <div id="sibbling">
    <div>
      <h5>{sibbling.nodename}</h5>
    </div>
  </div>
{/if}

