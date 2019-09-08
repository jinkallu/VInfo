<script>
     import LeftArrow from "./LeftArrow.svelte"; 
     import RightArrow from "./RightArrow.svelte"; 

     import {createEventDispatcher} from "svelte"; 
     export let siblings;
     export let selfId;
     

     const dispatch = createEventDispatcher();

     let beginIdx = 0;
     let maxSibsToShow = 4; // this length may calculated based on the 
     // text lengths of all nodename

     $: data = siblings.slice(beginIdx, Math.min(beginIdx + maxSibsToShow, siblings.length));

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
          data = siblings.slice(beginIdx, beginIdx + maxSibsToShow);
     }
     function rightArrow()
     {
          if(beginIdx + maxSibsToShow >= siblings.length)
          {
               return;
          }
          beginIdx + maxSibsToShow < siblings.length ? beginIdx += maxSibsToShow: beginIdx = siblings.length - maxSibsToShow;
          data = siblings.slice(beginIdx, beginIdx + maxSibsToShow);
     }
</script>

<style>
     .siblings{
          display: flex;
          align-items: center;
     }
     .sibling{
          padding: 1em;
          margin: 0.5em;
          background: DarkTurquoise;
          transition-duration: 1s;
          transition-timing-function: ease-in-out;
     }
</style>

<div class = "siblings" >
     {#if data.length > 0}
          <div class = "leftArrow"
               on:click = {leftArrow}
          >
               <LeftArrow />
          </div>
          
          {#each data as d}
               {#if d.nodeid !== selfId}
                    <div class = "sibling"
                         style = "background: DarkTurquoise;"
                         on:click = {() => dispatch("side", {
                                        nodeid: d.nodeid
                                   })}
                    > 
                         {d.nodename}
                    </div>
               {:else}
                    <div class = "sibling"
                         style = "background: Red;"
                         on:click = {() => dispatch("side", {
                                        nodeid: d.nodeid
                                   })}
                    > 
                         {d.nodename}
                    </div>
               {/if}
          {/each}
          <div class = "rightArrow" 
               on:click = {rightArrow}
          >
               <RightArrow />
          </div>
     {/if}
</div>
