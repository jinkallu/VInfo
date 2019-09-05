<script>
  import PreviewItem from "./PreviewItem.svelte";

  import { onMount, onDestroy, beforeUpdate } from "svelte";
  import nodestore from "../../selfstore.js";

  import PreviewCarousel from "../UI/PreviewCarousel.svelte";

  let sibblings;
  let self;
  let view_data = [];
  let unsubscribeSibblings;
  let unsubscribeSelf;

  unsubscribeSibblings = nodestore.subscribeSibblings(items => {
    if (items) {
      sibblings = items;
    } else {
      sibblings = [];
    }
  });

  unsubscribeSelf = nodestore.subscribeSelf(items => {
    if (items) {
      self = items;
    } else {
      self = [];
    }
  });

  onDestroy(() => {
    if (unsubscribeSibblings) {
      unsubscribeSibblings();
    }
    if (unsubscribeSelf) {
      unsubscribeSelf();
    }
  });

  function onsideclicked(event) {
    if (!event.detail.focus) {
      let clickedSelf = sibblings.find(
        node => node.nodeid == event.detail.nodeid
      );
      nodestore.onSideClicked(clickedSelf, sibblings);
    } else {
      console.log("Show full page of focus");
    }
  }
</script>

<style>
  .carouselsimple {
    position: relative;
    top: 50%;
    left: 50%;
    width: 190px;
    height: 210px;
    margin: 0;
    -webkit-perspective: 800px;
    perspective: 800px;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .carouselsimple-content {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    -webkit-transform: translateZ(-182px) rotateY(0);
    transform: translateZ(-182px) rotateY(0);
    -webkit-animation: carouselsimple 10s infinite
      cubic-bezier(1, 0.015, 0.295, 1.225) forwards;
    animation: carouselsimple 10s infinite cubic-bezier(1, 0.015, 0.295, 1.225)
      forwards;
  }

  .carouselsimple-item {
    position: absolute;
    top: 0;
    left: 0;
    width: 190px;
    height: 210px;
    border-radius: 6px;
  }

  .carouselsimple-item:nth-child(1) {
    background: rgba(252, 192, 77, 0.9);
    -webkit-transform: rotateY(0) translateZ(182px);
    transform: rotateY(0) translateZ(182px);
  }

  .carouselsimple-item:nth-child(2) {
    background: rgba(49, 192, 204, 0.9);
    -webkit-transform: rotateY(120deg) translateZ(182px);
    transform: rotateY(120deg) translateZ(182px);
  }

  .carouselsimple-item:nth-child(3) {
    background: rgba(236, 233, 242, 0.9);
    -webkit-transform: rotateY(240deg) translateZ(182px);
    transform: rotateY(240deg) translateZ(182px);
  }

  @-webkit-keyframes carouselsimple {
    0%,
    17.5% {
      -webkit-transform: translateZ(-182px) rotateY(0);
      transform: translateZ(-182px) rotateY(0);
    }
    27.5%,
    45% {
      -webkit-transform: translateZ(-182px) rotateY(-120deg);
      transform: translateZ(-182px) rotateY(-120deg);
    }
    55%,
    72.5% {
      -webkit-transform: translateZ(-182px) rotateY(-240deg);
      transform: translateZ(-182px) rotateY(-240deg);
    }
    82.5%,
    100% {
      -webkit-transform: translateZ(-182px) rotateY(-360deg);
      transform: translateZ(-182px) rotateY(-360deg);
    }
  }
  @keyframes carouselsimple {
    0%,
    17.5% {
      -webkit-transform: translateZ(-182px) rotateY(0);
      transform: translateZ(-182px) rotateY(0);
    }
    27.5%,
    45% {
      -webkit-transform: translateZ(-182px) rotateY(-120deg);
      transform: translateZ(-182px) rotateY(-120deg);
    }
    55%,
    72.5% {
      -webkit-transform: translateZ(-182px) rotateY(-240deg);
      transform: translateZ(-182px) rotateY(-240deg);
    }
    82.5%,
    100% {
      -webkit-transform: translateZ(-182px) rotateY(-360deg);
      transform: translateZ(-182px) rotateY(-360deg);
    }
  }

  .toper {
    display: flex;
    flex-direction: row;

    background: lightskyblue;
  }
</style>
<!--
<svelte:head>
  <link
    rel="stylesheet"
    href="../dist_paio/styles/jquery.carousel-3d.default.css" />
  <script src="../bower_components/jquery/dist/jquery.js">

  </script>
  <script
    src="../bower_components/javascript-detect-element-resize/jquery.resize.js">

  </script>
  <script src="../bower_components/waitForImages/dist/jquery.waitforimages.js">

  </script>
  <script src="../bower_components/modernizr/modernizr.js">

  </script>
  <script src="../dist_paio/jquery.carousel-3d.js">

  </script>
</svelte:head>
-->
<!-- <div>
  <div class="carouselsimple">
    {#if sibblings}
      <div class="carouselsimple-content">
        {#each sibblings as sibbling (sibblings.nodeid)}
          <div class="carouselsimple-item">
            <PreviewItem
              preview={sibbling}
              self={self.nodeid}
              on:side={onsideclicked} />
          </div>
          <!-- </div>
        {/each}

      </div>
    {/if}
  </div>
</div> -->

{#if sibblings}
  <div class="toper">
    {#each sibblings as sibbling (sibblings.nodeid)}
      <PreviewItem
        preview={sibbling}
        self={self.nodeid}
        on:side={onsideclicked} />

      <!-- <div id="circle"> -->
    {/each}
  </div>
  <PreviewCarousel data = {sibblings} />
{/if}
