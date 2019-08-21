<script>
     import * as d3 from 'd3';

     import { onMount } from 'svelte';

     export let data = [{rx: 50, ry: 10, width: 100, height: 50, color: "steelblue"}];
	onMount(() => {
          //var svg = d3.select("svg");
          var rectangle = d3.select("svg").selectAll("rectangle")
                         .data(data, function(d) { return d; });

          //circle.attr("r", 30);
          rectangle.enter().append("rect")
                    .attr("x", function(d) { return d.rx; })
                    .attr("y", function(d) { return d.ry; })
                    .attr("width", function(d) { return d.width; })
                    .attr("height", function(d) { return d.height; })
                    .style("fill", function(d) { return d.color; });

          rectangle.exit().remove();   
     });
</script>

