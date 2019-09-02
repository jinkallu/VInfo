<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  //   import { parent } from "../../nodestore.js";

  //   let unsubscribeparent;

  export let sibbling;
  export let selfId;
  let isSelf = false;

  //   export let id;
  //   export let title;
  //   export let subtitle;
  //   export let imageUrl;
  //   export let description;
  //   export let address;
  //   export let email;
  //   export let isFav;

  let isLoading = false;
  onMount(() => {
    if (sibbling.nodeid === selfId) {
      isSelf = true;
      console.log(sibbling.nodename);
    } else {
      isSelf = false;
    }
  });

  const dispatch = createEventDispatcher();

  function loadData(nodeid) {
    console.log(nodeid + "while clicking nodeid");
    if (!isSelf) {
      dispatch("side", {
        nodeid: nodeid,
        focus: event.detail.focus
      });
    }
  }

  //   onMount(() => {
  //       console.log("in on mounnt");
  //     unsubscribeparent = parent.subscribe(items => {
  //       loadedParent = items;
  //     });
  //     console.log(loadedParent);
  //   });

  //   onDestroy(() => {
  //     if (unsubscribeparent) {
  //       unsubscribeparent();
  //     }
  //   });

  //   function toggleFavorite() {
  //     isLoading = true;
  //     fetch(`https://svelte-course.firebaseio.com/meetups/${id}.json`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ isFavorite: !isFav }),
  //       headers: { "Content-Type": "application/json" }
  //     })
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error("An error occurred, please try again!");
  //         }
  //         isLoading = false;
  //         meetups.toggleFavorite(id);
  //       })
  //       .catch(err => {
  //         isLoading = false;
  //         console.log(err);
  //       });
  //   }
</script>

<style>
  .clickable {
    background: bisque;
  }
  .clickable:hover {
    background: yellowgreen;
  }

  #sibbling {
    width: 128px;
    height: 60px;
    border-radius: 5px;
    border: 2px solid orange;
  }

  #circle {
    /* background: lightblue; */
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

<!-- <article> -->
{#if !isSelf}
  <div
    id="sibbling"
    class="clickable"
    on:click={() => loadData(sibbling.nodeid)}>
    <div class="chip">
      <Badge>{sibbling.nodename}</Badge>
      <!-- <span class="badge">{sibbling.nodename}</span> -->
      <!-- <h5>{sibbling.nodename}</h5> -->
    </div>

    <!-- <p>{description}</p> -->
  </div>
{:else}
  <div id="sibbling">
    <div>
      <h5>{sibbling.nodename}</h5>
    </div>
  </div>
{/if}

<!-- </article> -->
