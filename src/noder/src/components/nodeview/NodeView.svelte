<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import ParentItem from "./parent/ParentItem.svelte";
  import SibblingScreen from "./siblings/SibblingScreen.svelte";
  import PreviewScreen from "./preview/PreviewScreen.svelte";
  import FullPage from "./fullview/FullPage.svelte";
  //import SelfItem from "../SelfItem.svelte";
  import ChildScreen from "./children/ChildScreen.svelte";
  import nodestore from "../store/selfstore.js";
  //import LoadingSpinner from "../../UI/LoadingSpinner.svelte";

  let previewFull = false;

  onMount(async () => {
    nodestore.fetchInitData();
  });

  function togglePreview(event){
    console.log("Toggle preview");
    previewFull = !previewFull;
  }
</script>

<style>
  #toper {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    background-color: white;
    justify-content: space-around;
  }
  
  .sibblings {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .children {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .parent {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .fullpage{
    height: 100%;
  }

  @media (min-width: 768px) {
    #noder {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>


<div id="toper">
  <!-- <section id="noder-parent"> -->

  <div class="divider" />

  <div class="divider" />
    {#if !previewFull}
  <div class="section">
    <div class="parent">
      <div>
        <ParentItem />
      </div>
    </div>
  </div>
  {/if}

  <div class="divider" />
  {#if !previewFull}
  <div class="section">
    <div class="sibblings">
      <SibblingScreen />
    </div>
  </div>
  {/if}
{#if !previewFull}
  <div class="section">
    <div class="preview">
      <PreviewScreen {previewFull} on:toggle = {togglePreview}
        style = "height: 50em;"/>
    </div>
  </div>
{:else}
  <div class = "fullpage">
    <FullPage {previewFull} on:toggle = {togglePreview}/>
  </div>
{/if}
{#if !previewFull}
  <div class="section">
    <div class="children">
      <ChildScreen />
    </div>
  </div>
  {/if}
</div>
