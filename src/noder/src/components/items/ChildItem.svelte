<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  //   import { parent } from "../../nodestore.js";

  //   let unsubscribeparent;

  export let child;

  //   export let id;
  //   export let title;
  //   export let subtitle;
  //   export let imageUrl;
  //   export let description;
  //   export let address;
  //   export let email;
  //   export let isFav;

  let isLoading = false;

  const dispatch = createEventDispatcher();

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
  #circle:hover {
    background: yellowgreen;
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
    padding: 5px;
  }

  h3 {
    color: blue;
    font-weight: bold;
  }
</style>

<div id="circle" on:click={() => dispatch('bottom', child.nodeid)}>

  <div>
    <!-- <h3>{child.nodename}</h3> -->
    <Badge>{child.nodename}</Badge>
  </div>

  <!-- <div>
    <Button
      mode="outline"
      type="button"
      on:click={() => dispatch('bottom', child.nodeid)}>
      VIEW
    </Button>
    
  </div> -->
</div>
