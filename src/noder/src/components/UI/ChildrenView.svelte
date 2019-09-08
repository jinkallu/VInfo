<script>
     import LeftArrow from "./LeftArrow.svelte"; 
     import RightArrow from "./RightArrow.svelte"; 

     import {createEventDispatcher} from "svelte"; 
     export let children;
     
     const dispatch = createEventDispatcher();

     let beginIdx = 0;
     let maxSibsToShow = 4; // this length may calculated based on the 
     // text lengths of all nodename

     $: data = children.slice(beginIdx, Math.min(beginIdx + maxSibsToShow, children.length));

     function leftArrow()
     {
          if(beginIdx <= 0)
          {
               return;
          }

          beginIdx -= maxSibsToShow;
          if(beginIdx < 0)
          {
               beginIdx = 0;
          }
          data = children.slice(beginIdx, beginIdx + maxSibsToShow);
     }
     function rightArrow()
     {
          if(beginIdx + maxSibsToShow >= children.length)
          {
               return;
          }
          beginIdx + maxSibsToShow < children.length ? beginIdx += maxSibsToShow: beginIdx = siblings.length - maxSibsToShow;
          data = children.slice(beginIdx, beginIdx + maxSibsToShow);
     }
</script>

<style>
     .children{
          display: flex;
          align-items: center;
     }
     .child{
          padding: 1em;
          margin: 0.5em;
          background: DarkTurquoise;
          transition-duration: 1s;
          transition-timing-function: ease-in-out;
          color: white;
     }
</style>

<div class = "children" >
     {#if data.length > 0}
          <div class = "leftArrow"
               on:click = {leftArrow}
          >
               <LeftArrow />
          </div>
          
          {#each data as d}
               <div class = "child"
                    style = "background: Navy;"
                    on:click = {() => dispatch("bottom", d.nodeid)}
               > 
                    {d.nodename}
               </div>
          {/each}
          <div class = "rightArrow" 
               on:click = {rightArrow}
          >
               <RightArrow />
          </div>
     {/if}
</div>
