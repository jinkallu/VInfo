<script>
  import { onMount, onDestroy } from "svelte";
  import nodestore from "../../selfstore.js";
  import ChildItem from "./ChildItem.svelte";

  let unsubscribeChildren;
  let unsubscribeSelf;
  let children = [];
  let self = [];

  onMount(() => {
    unsubscribeChildren = nodestore.subscribeChildren(items => {
      children = items;
    });
     unsubscribeSelf = nodestore.subscribeSelf(items => {
      self = items;
    });
  });

  // function onbottonclickedapi(node) {
  //   let postdata = { nodeid: node, nodetype: "BOTTOM", session: "kdfdkf" };
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
  //       if (fetchdata.children) {
  //         children.set(fetchdata.children);
  //       } else {
  //         children.set([]);
  //       }
  //       sibblings.set(loadedchildrenforupdate);
  //     })
  //     .catch(err => {
  //       isLoading = false;
  //       console.log(err);
  //     });
  // }

  function onbottomclicked(event) {
    console.log("bottom clicked");

    // parent.set(loadedself);
    let clickedSelf = children.find(node => node.nodeid == event.detail);
    nodestore.onBottomClicked(self,clickedSelf,children);

    // console.log(clickedSelf.nodeid);
    // self.set(clickedSelf);
    // sibblings.set([]);
    // loadedchildrenforupdate = loadedchildren;
    // children.set([]);
    // const apichildren = onbottonclickedapi(event.detail);
  }

  onDestroy(() => {
    if (unsubscribechildren) {
      unsubscribechildren();
    }
    if (unsubscribeSelf) {
      unsubscribeSelf();
    }
  });
</script>

<style>
  .toper {
    display: flex;
    flex-direction: row;

    background: lightskyblue;
  }
</style>

<div class="toper">
  {#if children}
    {#each children as child (children.nodeid)}
      <ChildItem {child} on:bottom={onbottomclicked} />
      <!-- </div> -->
    {/each}
  {/if}
</div>
