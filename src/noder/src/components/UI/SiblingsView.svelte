<script>
  import LeftArrow from "./LeftArrow.svelte";
  import RightArrow from "./RightArrow.svelte";
  import Badge from "./Badge.svelte";

  import { createEventDispatcher } from "svelte";
  export let siblings;
  export let selfId;

  const dispatch = createEventDispatcher();

  let beginIdx = 0;
  let maxSibsToShow = 4; // this length may calculated based on the
  // text lengths of all nodename

  $: data = siblings.slice(
    beginIdx,
    Math.min(beginIdx + maxSibsToShow, siblings.length)
  );

  function leftArrow() {
    if (beginIdx <= 0) {
      return;
    }

    beginIdx -= maxSibsToShow;
    if (beginIdx < 0) {
      beginIdx = 0;
    }
    data = siblings.slice(beginIdx, beginIdx + maxSibsToShow);
  }
  function rightArrow() {
    if (beginIdx + maxSibsToShow >= siblings.length) {
      return;
    }
    beginIdx + maxSibsToShow < siblings.length
      ? (beginIdx += maxSibsToShow)
      : (beginIdx = siblings.length - maxSibsToShow);
    data = siblings.slice(beginIdx, beginIdx + maxSibsToShow);
  }

  function onSideClick() {}
</script>

<style>
  .siblings {
    display: flex;
    align-items: center;
  }
  .sibling {
    border: 2px solid blue;
    padding: 1em;
    margin: 0.5em;
    background: DarkTurquoise;
    transition-duration: 1s;
    transition-timing-function: ease-in-out;
  }
</style>

<div class="siblings">
  {#if data.length > 0}
    <div class="leftArrow" on:click={leftArrow}>
      <LeftArrow />
    </div>

    {#each data as d, i}
      {#if d.nodeid !== selfId}
        <div
          class="sibling"
          style="background: lightblue;"
          on:click={() => dispatch('side', { nodeid: d.nodeid })}>
          {d.nodename}
          <Badge>
            {siblings.findIndex(j => j.nodeid == d.nodeid) + 1}/{siblings.length}
          </Badge>

        </div>
      {:else}
        <div
          class="sibling"
          style="background: green;"
          on:click={() => dispatch('side', { nodeid: d.nodeid })}>
          {d.nodename}
          <Badge>
            {siblings.findIndex(j => j.nodeid == d.nodeid) + 1}/{siblings.length}
          </Badge>
        </div>
      {/if}
    {/each}
    <div class="sibbling" style="background:white;" />
    <div class="rightArrow" on:click={rightArrow}>
      <RightArrow />
    </div>
  {:else}
    <div class="sibling" style="background: DarkTurquoise;">Loading...</div>
  {/if}
</div>
