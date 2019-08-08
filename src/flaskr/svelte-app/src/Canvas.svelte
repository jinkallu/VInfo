<script>
	import GenDrawPos from './GenDrawPos.svelte'; 
	import DrawNode from './DrawNode.svelte';
	import DrawText from './DrawText.svelte';

     export let left = 0;
	export let top = "100px";
	let canvas;

	let node_names = ["Maths", "Arithmetic", "Algebra", "Geometry", "Trigonometry", "Functions", "Probability", "Statistics", "Calculus"];


	let x = 500;
	let y = 500;

	import { onMount } from 'svelte';
	
	onMount(() => {
		//canvas.width = window.innerWidth;
          //canvas.height = window.innerHeight;
          canvas.style.top = top;
          canvas.style.left = left;
	});
</script>

<style>
	#myCanvas{
		width: 1000;
		height: 1000;
	}
</style>

<canvas bind:this={canvas} id="myCanvas" width="1000" height="1000"></canvas>

<GenDrawPos node_names = {node_names} x = {x} y = {y} let:nodes_pos>
	{#each nodes_pos as pos}
		<DrawNode canv = {canvas} x = {pos.rx} y = {pos.ry}/>
		<DrawText canv = {canvas} x = {pos.rx} y = {pos.ry + 60} text = {pos.name}/>
	{/each}
</GenDrawPos>

