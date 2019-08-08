<script>
     export let canv = undefined;
     export let x = 95;
     export let y = 50;
     export let text = "hello world!";

     import { onMount } from 'svelte';

     onMount(() => {
          var ctx = canv.getContext("2d");
          ctx.font = "20px Arial";
          ctx.fillText(text, x - ctx.measureText(text).width / 2, y);
     });
</script>