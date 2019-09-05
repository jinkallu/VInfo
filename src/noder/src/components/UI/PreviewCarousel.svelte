<script>
     import { onMount, createEventDispatcher } from 'svelte';

     export let data;
     
     var carousel;
     var cells;
     var selectedIndex = 0;
     var cellCount; // cellCount set from cells-range input value
     var cellWidth;
     var cellHeight;
     var isHorizontal;
     var rotateFn;
     var radius, theta;
     var cellsRange = 9;
     var focusId = 0;
     

	onMount(async () => {
          carousel = document.querySelector('.carousel');
          cells = carousel.querySelectorAll('.carousel__cell');
          
          
          cellWidth = carousel.offsetWidth;
          cellHeight = carousel.offsetHeight;
          isHorizontal = true;
          rotateFn = isHorizontal ? 'rotateY' : 'rotateX';

          cellCount = cellsRange;
          theta = 360 / cellCount;
          var cellSize = isHorizontal ? cellWidth : cellHeight;
          radius = Math.round( ( cellSize / 2) / Math.tan( Math.PI / cellCount ) );
     });

     function rotateCarousel() {
          var angle = theta * selectedIndex* -1;
          carousel.style.transform = 'translateZ(' + -radius + 'px) ' + 
          rotateFn + '(' + angle + 'deg)';
     }

     
     function prev() {
          selectedIndex--;
          if(selectedIndex < 0)
          {
               selectedIndex = 0;
          }
          rotateCarousel();
     }

     function next(){
          selectedIndex++;
          if(selectedIndex >= cellsRange)
          {
               selectedIndex = cellsRange - 1;
          }
          rotateCarousel();
     }

     function clicked(id)
     {
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
          }
     }

</script>

<style>
.scene {
  border: 1px solid #CCC;
  margin: 40px 0;
  position: relative;
  width: 210px;
  height: 140px;
  margin: 80px auto;
  perspective: 1000px;
}

.carousel {
  width: 100%;
  height: 100%;
  position: absolute;
  transform: translateZ(-288px);
  transform-style: preserve-3d;
  transition: transform 1s;
}

.carousel__cell {
  position: absolute;
  width: 190px;
  height: 120px;
  left: 10px;
  top: 10px;
  border: 2px solid black;
  line-height: 116px;
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-align: center;
  transition: transform 1s, opacity 1s;
}

.carousel__cell:nth-child(9n+1) { background: hsla(  0, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+2) { background: hsla( 40, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+3) { background: hsla( 80, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+4) { background: hsla(120, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+5) { background: hsla(160, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+6) { background: hsla(200, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+7) { background: hsla(240, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+8) { background: hsla(280, 100%, 50%, 0.8); }
.carousel__cell:nth-child(9n+0) { background: hsla(320, 100%, 50%, 0.8); }

.carousel__cell:nth-child(1) { transform: rotateY(  0deg) translateZ(288px); }
.carousel__cell:nth-child(2) { transform: rotateY( 40deg) translateZ(288px); }
.carousel__cell:nth-child(3) { transform: rotateY( 80deg) translateZ(288px); }
.carousel__cell:nth-child(4) { transform: rotateY(120deg) translateZ(288px); }
.carousel__cell:nth-child(5) { transform: rotateY(160deg) translateZ(288px); }
.carousel__cell:nth-child(6) { transform: rotateY(200deg) translateZ(288px); }
.carousel__cell:nth-child(7) { transform: rotateY(240deg) translateZ(288px); }
.carousel__cell:nth-child(8) { transform: rotateY(280deg) translateZ(288px); }
.carousel__cell:nth-child(9) { transform: rotateY(320deg) translateZ(288px); }



.carousel-options {
  text-align: center;
  position: relative;
  z-index: 2;
  background: hsla(0, 0%, 100%, 0.8);
}

</style>  

<div class="scene">
  <div class="carousel">
     {#if data}
          {#each data as d, i}
               <div class="carousel__cell" on:click = {() => clicked(i)}> {d.nodename} </div>
          {/each}
     {/if}
    <!--
    <div class="carousel__cell" on:click = {() => clicked(2)}>2</div>
    <div class="carousel__cell" on:click = {() => clicked(3)}>3</div>
    <div class="carousel__cell" on:click = {() => clicked(4)}>4</div>
    <div class="carousel__cell" on:click = {() => clicked(5)}>5</div>
    <div class="carousel__cell" on:click = {() => clicked(6)}>6</div>
    <div class="carousel__cell" on:click = {() => clicked(7)}>7</div>
    <div class="carousel__cell" on:click = {() => clicked(8)}>8</div>
    <div class="carousel__cell" on:click = {() => clicked(9)}>9</div>
    -->
  </div>
</div>

<div class="carousel-options">
     <button class="previous-button" on:click = {() => prev(1)}>Previous</button>
     <button class="next-button" on:click = {next}>Next</button>
</div>