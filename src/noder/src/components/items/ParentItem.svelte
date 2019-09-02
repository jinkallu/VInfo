<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  import nodestore from "../../selfstore.js";

  const dispatch = createEventDispatcher();

  let unsubscribeParent;
  let unsubscribeSibblings;

  let parent;
  let sibblings;

  onMount(() => {
    unsubscribeParent = nodestore.subscribeParent(items => {
      parent = items;
    });

    unsubscribeSibblings = nodestore.subscribeSibblings(items => {
      sibblings = items;
    });
  });

  onDestroy(() => {
    if (unsubscribeParent) {
      unsubscribeParent();
    }
    if (unsubscribeSibblings) {
      unsubscribeSibblings();
    }
  });

  // function ontopclickedapi(node) {
  //   let postdata = { nodeid: node, nodetype: "TOP", session: "kdfdkf" };
  //   return fetch("http://localhost:5000/listnodes", {
  //     method: "POST",
  //     body: JSON.stringify(postdata),
  //     headers: { "Content-Type": "application/json" }
  //   })
  //     .then(res => {
  //       if (!res.ok) {
  //         throw new Error("An error occurred, please try again!");
  //       }
  //       return res.json();
  //     })
  //     .then(fetchdata => {
  //       if (fetchdata.sibblings) {
  //         sibblings.set(fetchdata.sibblings);
  //       } else {
  //         sibblings.set([]);
  //       }
  //       if (fetchdata.parent) {
  //         parent.set(fetchdata.parent);
  //       } else {
  //         parent.set([]);
  //       }

  //       children.set(loadedsibblingforupdate);

  //       // return res.json();
  //     })
  //     .catch(err => {
  //       isLoading = false;
  //       console.log(err);
  //     });
  // }

  function ontopclicked(nodeid) {
    console.log("ontope clicked");
    nodestore.onTopClicked(parent, sibblings, nodeid);

    // console.log(nodeid + "details");
    // self.set(loadedparent);
    // loadedsibblingforupdate = loadedsibblings;

    // children.set([]);
    // parent.set([]);
    // sibblings.set([]);

    // const apisibblings = ontopclickedapi(nodeid);

    // let clickedSelf = loadedsibblings.find(node => node.nodeid == event.detail);
    // console.log(clickedSelf.nodename);
    // // self.set([]);
    // self.set(clickedSelf);

    // sibblings.set([]);
    // children.set([]);

    // const apichildren = ontopclickedapi(event.detail);
    // console.log(res.children);

    // console.log(apidata.children);
  }
</script>

<style>
  #circle {
    background: lightblue;
    width: 128px;
    height: 128px;
    border-radius: 64px;
    border: 2px solid orange;
  }

  .self {
    color: red;
  }
  #circle div {
    position: relative;
    left: 19px;
    top: 19px;
    width: 90px;
    height: 50px;
    color: white;
    text-align: center;
  }

  h3 {
    color: blue;
    font-weight: bold;
  }
</style>

{#if parent}
  <div id="circle">

    <div>
      <Badge>{parent.nodename}</Badge>
    </div>

    {#if parent.pnodeid}
      <div>
        <Button
          mode="outline"
          type="button"
          on:click={() => ontopclicked(parent.nodeid)}>
          VIEW
        </Button>
      </div>
    {/if}

  </div>
{/if}
