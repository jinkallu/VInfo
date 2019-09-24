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
  }

  .preview {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto;

    grid-template-areas:
      ". gnodename gnodename . "
      "gbriefdesc gbriefdesc gbriefdesc gbriefdesc"
      " gdesc gdesc gdesc gimage"
      " gdesc gdesc gdesc gvideo"
      ;
    padding: 30px;
  }

  .nodename {
    grid-area: gnodename;
    align-self: center;
    text-align: center;
    color: black;
  }

  .briefdesc {
    grid-area: gbriefdesc;
    font-style: italic;
    font-weight: bold;
    text-align: center;
    align-self: center;
  }
  .desc {
    grid-area: gdesc;
    padding: 1em;
    align-self: center;
  }

  .image {
    grid-area: gimage;
    width: 100%;
    align-self: auto;
    padding: 1em;
  }

  .img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    overflow: auto;
  }
  .video{
    grid-area: gvideo;
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
      {preview.briefdesc}
    {/if}
  </div>
  {#if previewData}
    {#each previewData as preview, i}
        {#if preview.attribtype === 'IMAGE'}
            <div class = "image">
              <img class = "img" src={preview.val} alt="image" />
            </div>
        {/if}

        {#if preview.attribtype === 'TEXT'}
          <div class="desc">
            {preview.val}
          </div>
        {/if}
    {/each}
    <div class = "video">
      <iframe width="100%" 
              src="https://www.youtube.com/embed/ohyai6GIRZg?autoplay=1&mute=1&&end=455" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
      </iframe>
    </div> 
  {/if}
</div>
