<script>
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import ParentItem from "./parent/ParentItem.svelte";
  import SibblingScreen from "./siblings/SibblingScreen.svelte";
  import PreviewScreen from "./preview/PreviewScreen.svelte";
  import SelfItem from "../SelfItem.svelte";
  import ChildScreen from "./children/ChildScreen.svelte";
  import nodestore from "../store/selfstore.js";
  import LoadingSpinner from "../../UI/LoadingSpinner.svelte";

  onMount(async () => {
    nodestore.fetchInitData();
  });
</script>

<style>
  #toper {
    display: flex;
    width: 100%;
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
  <div class="section">
    <div class="parent">
      <div>
        <ParentItem />
      </div>
    </div>
  </div>

  <div class="divider" />
  <div class="section">
    <div class="sibblings">
      <SibblingScreen />
    </div>
  </div>

  <div class="section">
    <div class="preview">
      <PreviewScreen />
    </div>
  </div>

  <div class="section">
    <div class="children">
      <ChildScreen />
    </div>
  </div>
</div>
