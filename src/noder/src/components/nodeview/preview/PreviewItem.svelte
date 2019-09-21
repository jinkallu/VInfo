<script>
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    createEventDispatcher
  } from "svelte";
  //import Button from "../UI/Button.svelte";
  //import Badge from "../UI/Badge.svelte";
  //import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let preview;
  export let self;
  export let previewData;

  let isLoading = false;

  const dispatch = createEventDispatcher();

  onMount(() => {
    console.log("preview item onmount called");
  });
</script>

<style>
  p {
    font-size: 1rem;
    margin: 0;
  }

  div {
    text-align: center;
  }

  .preview {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 10% auto;
    grid-gap: 10px;

    grid-template-areas:
      ". gnodename gnodename ."
      "gbriefdesc gbriefdesc gimage gimage";
    padding: 30px;
  }

  .nodename {
    grid-area: gnodename;
    align-self: center;
    color: black;
  }

  .briefdesc {
    grid-area: gbriefdesc;
    overflow: hidden;
  }

  .image {
    grid-area: gimage;
    width: 100px;
  }

  .img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
</style>

<div class="preview" on:click>
  <div class="nodename">
    {#if preview.nodeid == self}
      {#if preview.nodename}
        <h1>{preview.nodename}</h1>
      {/if}
    {/if}
  </div>
  <div class="briefdesc">
    {#if preview.briefdesc}
      <p>{preview.briefdesc}</p>
    {/if}
  </div>
  <!-- <div class = "image">
        <img class = "img" src = "images/science.png" alt = ""/>
      </div> -->

  {#if previewData}
    {#each previewData as preview}
      <div>
        {#if preview.attribtype == 'IMAGE'}
          <div class="image">
            <img class="img" src={preview.val} alt="" />
          </div>
        {/if}

        {#if preview.attribtype == 'TEXT'}
          <p>{preview.val}</p>
        {/if}
      </div>
    {/each}
  {/if}
</div>
