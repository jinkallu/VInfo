<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  //import Button from "../UI/Button.svelte";
  //import Badge from "../UI/Badge.svelte";
  //import LoadingSpinner from "../UI/LoadingSpinner.svelte";
 
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
  .sibbling.clickable {
    background: DarkTurquoise;
  }
  .sibbling.clickable:hover {
    background: rgb(15, 196, 156);
    margin: 0 5px;
  }

  .sibbling {
    padding: 1em;
    background: rgb(163, 5, 5);
    margin: 0 5px;
    color: white;
  }

 
</style>

<!-- <article> -->
{#if !isSelf}
  <div
    class="sibbling clickable"
    on:click={() => loadData(sibbling.nodeid)}>
    <div>
      <!--<Badge>{sibbling.nodename}</Badge>-->
      {sibbling.nodename}
    </div>

  </div>
{:else}
  <div class="sibbling">
    <div>
      {sibbling.nodename}
    </div>
  </div>
{/if}

