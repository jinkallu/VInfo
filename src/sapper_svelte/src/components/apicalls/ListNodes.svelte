<script>
    import { onMount } from "svelte";
     //let url = "http://0.0.0.0:5000/login?username=jinesh&password=jinesh&sessiondata=ppp";
     let url = "http://0.0.0.0:5000/listnodes?session=ss&nodetype=TOP";
     export let data = [];
     export let flag = false;
     onMount(async () =>  {
              const response = await fetch(url, {method: 'POST'});
              const json = await response.json();
              data = json;

              //console.log(data.parent.briefdesc);
              flag = true;
         }
     );
</script>
