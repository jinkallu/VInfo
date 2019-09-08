<script>
     import { onMount, createEventDispatcher } from 'svelte';

     export let data;

     const dispatch = createEventDispatcher();
     
     var carousel;
     var cells;
     var cellCount; // cellCount set from cells-range input value
     var cellWidth;
     var cellHeight;
     var isHorizontal;
     var rotateFn = 'rotateY';
     //var radius, theta;
     $: cellsRange = data.length * 4;
     $: focusId = data.length / 2;
     //$: selectedIndex = focusId;
     let angle = 0;
     $: theta = 360 / (cellsRange);
     $: radius = Math.round( ( cellWidth / 2) / Math.tan( Math.PI / (cellsRange) ) );


	onMount(() => {
          carousel = document.querySelector('.childrencarousel');
          cells = carousel.querySelectorAll('.childrencarousel__cell');
          cellWidth = carousel.offsetWidth;
               cellHeight = carousel.offsetHeight;
          });

     function rotateCarousel(dir) {
          angle += theta * dir * -1;
          carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
          rotateFn + '(' + angle + 'deg)';
     }

     
     function prev() {
          rotateCarousel(-1);
     }

     function next(){
          rotateCarousel(1);
     }

     function clicked(id)
     {
          console.log(id, focusId);
          if(id !== focusId)
          {
               var diff = focusId - id;
               focusId = id;
               if(diff > 0){
                    for (var i = 0; i < Math.abs(diff); i++){
                         prev();
                    }
               }
               else{
                    for (var i = 0; i < Math.abs(diff); i++){
                         next();
                    }
               }
          }
          else{
               console.log("Clicked focus");
               dispatch('bottom', data[id].nodeid);
          }
     }

</script>

<style>
     .scene {
     border: 1px solid #CCC;
     margin: 40px 0;
     position: relative;
     width: 210px;
     height: 100px;
     margin: 80px auto;
     perspective: 1000px;
     }

     .childrencarousel {
     width: 100%;
     height: 100%;
     position: absolute;
     transform: translateZ(-288px);
     transform-style: preserve-3d;
     transition: transform 1s;
     }

     .childrencarousel__cell {
     position: absolute;
     width: 190px;
     height: 80px;
     left: 10px;
     top: 10px;
     border: 2px solid black;
     line-height: 80px;
     font-size: 20px;
     font-weight: bold;
     color: white;
     text-align: center;
     transition: transform 1s, opacity 1s;
     }

     .childrencarousel__cell { background: hsla(240, 100%, 50%, 0.8); }

</style>  

<div class="scene">
  <div class="childrencarousel">
     {#if data}
          {#each data as d, i}
               <div class="childrencarousel__cell" 
                    style = "transform: rotateY(  {(i - Math.floor(data.length / 2)) * theta}deg) translateZ({radius}px); "
                    on:click = {() => clicked(i)}> 
                    {d.nodename}
               </div>
               
          {/each}
     {/if}
  </div>
</div>
<!--
<div class="childrencarousel-options">
     <button class="previous-button" on:click = {() => prev()}>Previous</button>
     <button class="next-button" on:click = {next}>Next</button>
</div>
-->