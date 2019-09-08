<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  //import Button from "../UI/Button.svelte";
  //import Badge from "../UI/Badge.svelte";
  //import LoadingSpinner from "../UI/LoadingSpinner.svelte";

  export let child;

  let isLoading = false;

  const dispatch = createEventDispatcher();

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
</div>
