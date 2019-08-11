<script>
     import * as d3 from 'd3';

     import { onMount } from 'svelte';

     export let data = [{rx: 10, ry: 10}];
	
	onMount(() => {
          var svg = d3.select("svg");
          var circle = svg.selectAll("circle")
                         .data(data, function(d) { return d; });

          //circle.attr("r", 30);
          circle.enter().append("circle")
                    .attr("cx", function(d) { return d.rx; })
                    .attr("cy", function(d) { return d.ry; })
                    .attr("r", 40)
                    .style("fill", "steelblue");

          circle.exit().remove();

          
     });
</script>

<svg width="1000" height="1000">
</svg>