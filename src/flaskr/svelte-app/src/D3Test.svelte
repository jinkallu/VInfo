<script>
     import * as d3 from 'd3';

     import { onMount } from 'svelte';
	
	onMount(() => {
          var svg = d3.select("svg");
          svg.selectAll("circle")
               .data([32, 57, 112, 293])
               .enter().append("circle")
                    .attr("cy", 60)
                    .attr("cx", function(d, i) { return i * 100 + 30; })
                    .attr("r", function(d) { return Math.sqrt(d); });
          
     });
</script>

<svg width="720" height="120">
</svg>