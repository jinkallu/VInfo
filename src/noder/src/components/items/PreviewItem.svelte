<script>
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    createEventDispatcher
  } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let preview;
  export let self;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  onMount(() => {
    console.log("preview item onmount called");
  });
</script>

<style>
  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }
.self{color:yellow}
  /* .content {
    height: 4rem;
  } */
</style>

<div class="row">
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">
      {#if preview.nodeid==self}
        <span class=" self card-title">{preview.nodename}</span>
        {:else}
        <span class="card-title">{preview.nodename}</span>

        {/if}
        <div>
          <p>{preview.briefdesc}</p>
        </div>
      </div>
    </div>
  </div>
</div>
