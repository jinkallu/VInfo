<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import NodeView from "../components/items/NodeView.svelte";
  //
  // import Button from "../components/UI/Button.svelte";
  // import ParentItem from "../components/items/ParentItem.svelte";
  // import SibblingScreen from "../components/items/SibblingScreen.svelte";
  // import PreviewItem from "../components/items/PreviewItem.svelte";
  // import SelfItem from "../components/items/SelfItem.svelte";
  // import ChildScreen from "../components/items/ChildScreen.svelte";
  // import noder from "../nodestore.js";
  // import { self, parent, children, sibblings } from "../selfstore.js";
  // //   import EditMeetup from "../components/Meetup/EditMeetup.svelte";
  // import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";

  // export let fetchedfulldata;

  // export let fetchedself;
  // export let fetchedparent;
  // export let fetchedsibblings;
  // export let fetchedchildren;

  // let isSelf = false;

  // let loadedself;
  // let loadedparent;
  // let loadedsibblings;
  // let loadedchildren;

  // let loadeddata;

  // let loadedMeetups = [];
  // let editMode;
  // let editedId;
  // let isLoading;
  // let unsubscribenoder;
  // let unsubscribeself;
  // let unsubscribeparent;
  // let unsubscribechildren;
  // let unsubscribesibblings;

  // const dispatch = createEventDispatcher();

  // onMount(() => {
  //   // console.log("in on mount");
  //   // console.log(fetchedfulldata);
  //   unsubscribeself = self.subscribe(items => {
  //     loadedself = items;
  //   });
  //   self.set(fetchedself);

  //   unsubscribeparent = parent.subscribe(items => {
  //     loadedparent = items;
  //   });
  //   parent.set(fetchedparent);

  //   unsubscribesibblings = sibblings.subscribe(items => {
  //     loadedsibblings = items;
  //   });
  //   sibblings.set(fetchedsibblings);

  //   unsubscribechildren = children.subscribe(items => {
  //     loadedchildren = items;
  //   });
  //   children.set(fetchedchildren);
  // });

  // onDestroy(() => {
  //   // if (unsubscribenoder) {
  //   //   unsubscribenoder();
  //   // }
  //   if (unsubscribeself) {
  //     unsubscribeself();
  //   }
  //   if (unsubscribeparent) {
  //     unsubscribeparent();
  //   }

  //   if (unsubscribesibblings) {
  //     unsubscribesibblings();
  //   }

  //   if (unsubscribechildren) {
  //     unsubscribechildren();
  //   }
  // });
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

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css" />
  <script
    src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js">

  </script>
  <title>Noder</title>
</svelte:head>
<div>

  <NodeView />
</div>
