<script>
  import Sidenav from "./Sidenav.svelte";
  import ThreeWindow from "./ThreeWindow.svelte";
  import Canvas from "./Canvas.svelte";
</script>

<style>
  .side {
    position: absolute;
    top: 0px;
    left: 0;
  }
  .canv {
    left: 150;
  }
</style>

  
<body>
  <div class = "canv"> <Canvas left = {100}, top = {100}/> </div>
  <div class = "side"> <Sidenav /> </div>
</body>



