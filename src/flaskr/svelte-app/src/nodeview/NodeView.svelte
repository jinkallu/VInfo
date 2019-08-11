<script>
  import D3Test from './D3Test.svelte';
  import GenDrawPos from './GenDrawPos.svelte'; 
  import GenHBolaPos from './GenHBolaPos.svelte';
  
  let node_names = ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Functions", "Probability", "Statistics"];
  let nodes_pos_p;



</script>

<GenHBolaPos bind:nodes_pos = {nodes_pos_p} node_names = {node_names} x_center = {600} y_center = {200} let:nodes_pos>
    <D3Test  data = {nodes_pos}/>
</GenHBolaPos>


<!-- 
<GenDrawPos node_names = {node_names} x = {500} y = {500} let:nodes_pos>
    <D3Test data = {nodes_pos}/>
</GenDrawPos>
-->
