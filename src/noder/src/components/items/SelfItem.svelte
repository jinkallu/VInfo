<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";
  import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let self;

  let isLoading = false;

  const dispatch = createEventDispatcher();
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    /* border-radius: 25%; */
    background: lightcoral;
    margin: 1rem;
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

</style>

<article>

  <div>
    <h2>{self.nodename}</h2>

    <h2>{self.title}</h2>
    <p>{self.briefdesc}</p>
  </div>
</article>
