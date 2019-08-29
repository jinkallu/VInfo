<script>
    import { onMount } from "svelte";
     export let data = [];
     export let flag = false;
     export let nodeid;
     $: url = "http://0.0.0.0:5000/listnodes?session=ss&nodetype=FOCUS&nodeid=" + nodeid;//db4b740e-c3cf-406f-ab70-78e0929ece80";

     onMount(

              async () =>  {
              const response = await fetch(url, {method: 'POST'});
              const json = await response.json();
              data = json;

              flag = true;
         }
     );
</script>
