<script>
     export let canv = undefined;
     export let x = 95;
     export let y = 50;
     export let r = 40;
     import { onMount } from 'svelte';

     
	
	onMount(() => {
          
          var ctx = canv.getContext("2d");

          ctx.beginPath();
          ctx.arc(x, y, r, 0, 2 * Math.PI);
          ctx.stroke();
          ctx.fillStyle = "blue";
          ctx.fill();
          
     });
</script>
