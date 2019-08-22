<script>
    import { onMount } from "svelte";
         let url = "http://0.0.0.0:5000/login?username=jinesh&password=jinesh&sessiondata=ppp";
         //let url = "https://0.0.0.0:5000/listnodes";
         export let data = [];
         onMount(async function() {
              const response = await fetch(url, {method: 'POST'});
              const json = await response.json();
              data = json;

              //console.log(data);
         });
</script>
