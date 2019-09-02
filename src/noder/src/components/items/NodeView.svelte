<script>
  import { onMount } from "svelte";
  // import Parent from "./Parent.svelte";
  // import Children from "./Children.svelte";
  // import SelfAndSibblings from "./SelfAndSibblings.svelte";
  // import SibblingsScreen from "./SelfAndSibblingsNorm.svelte";

  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import ParentItem from "./ParentItem.svelte";
  import SibblingScreen from "./SibblingScreen.svelte";
  import PreviewScreen from "./PreviewScreen.svelte";
  import SelfItem from "./SelfItem.svelte";
  import ChildScreen from "./ChildScreen.svelte";
  // import noder from "../nodestore.js";
  import nodestore from "../../selfstore.js";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  onMount(async () => {
    nodestore.fetchInitData();
  });
</script>

<style>
  #toper {
    display: flex;
    width: 100%;
    flex-direction: column;
    background-color: lightcyan;
    justify-content: space-around;
  }
  #noder {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #noder-parent {
    background-color: #bbb;

    margin: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  #noder-controls {
    background-color: #bbb;
    overflow: scroll;
    margin: 1rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
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

  #no-noder {
    margin: 1rem;
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
