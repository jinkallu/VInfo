<script>
     import * as d3 from 'd3';

     import { onMount } from 'svelte';

     export let data = [];
        onMount(() => {
         // var svg = d3.select("svg");

// test rect
var rectangle = d3.select("svg").selectAll("rectangle")
               .data(data, function(d) { return d; });

//circle.attr("r", 30);
rectangle.enter().append("rect")
          .attr("x", function(d) { return d.rx; })
          .attr("y", function(d) { return d.ry; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.color; })
          ;

rectangle.exit().remove();


        var image = d3.select("svg").selectAll("image")
                       .data(data, function(d) { return d; });


        image.enter().append("image")
          .attr('xlink:href', function(d) { return d.src; })
          .attr('width', function(d) { return d.width; })
          .attr('height', function(d) { return d.height; })
          .attr('x', function(d) { return d.rx; })
          .attr('y', function(d) { return d.ry; })
          .attr('stroke', 'black')
          .on("click", function(d) {
                let focus = d.focus;
                if( focus === 1)
                {
                  console.log("Focus " + focus);
                }
                else{
                    console.log("No Focus " + focus);
                }
          })
          ;

        image.exit().remove();

//
     });
</script>


