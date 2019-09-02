<script>
  import {
    onMount,
    onDestroy,
    beforeUpdate,
    createEventDispatcher
  } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";
  //   import { parent } from "../../nodestore.js";

  //   let unsubscribeparent;

  export let preview;
  export let self;

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

  onMount(() => {
    console.log("preview item onmount called");
  });

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
  #circle {
    background: black;
    width: 128px;
    height: 128px;
    border-radius: 64px;
    border: 2px solid orange;
  }
  #circle div {
    position: relative;
    left: 19px;
    top: 19px;
    width: 90px;
    height: 90px;
    color: white;
    text-align: center;
  }

  .element {
    shape-outside: url(image.png);
    shape-image-threshold: 0.5;
    float: left;
  }
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 25%;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }
.self{color:yellow}
  /* .content {
    height: 4rem;
  } */
</style>




<div class="row">
  <div class="col s12 m6">
    <div class="card blue-grey darken-1">
      <div class="card-content white-text">+
      {#if preview.nodeid==self}
        <span class=" self card-title">{preview.nodename}</span>
        {:else}
        <span class="card-title">{preview.nodename}</span>

        {/if}
        <div>
          <p>{preview.briefdesc}</p>
        </div>
      </div>
    </div>
  </div>
</div>
