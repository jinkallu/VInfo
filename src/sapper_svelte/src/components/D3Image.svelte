<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    const click = () => dispatch('click');
     import * as d3 from 'd3';

     import { onMount } from 'svelte';

     export let test;
     export let data = [];
     export let clicked_id = undefined;

    onMount(() => {
        create();
    });

function create() {
    // test rect
    var svg = d3.select("svg");
    var group = svg.selectAll("g")
                           .data(data, function(d) { return d; })
                           .enter()
                           .append("g")
                           //.attr("transform", "")
                           ;

    group.append("rect")
          .transition()
          .attr("x", function(d) { return d.rx; })
          .attr("y", function(d) { return d.ry; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.color; })
          ;

    group.append("image")
      .attr('xlink:href', function(d) { return d.src; })
      .attr('width', function(d) { return d.width; })
      .attr('height', function(d) { return d.height; })
      .attr('x', function(d) { return d.rx; })
      .attr('y', function(d) { return d.ry; })
      .attr('stroke', 'black')
      .on("click", function(d, i) {
            let focus = d.focus;
            if( focus === 1)
            {
              console.log("Focus " + focus + " " + i + " " + d.id );

            }
            else{
                console.log("No Focus " + focus + " " + i  + " " + d.id );
                clicked_id = d.id;
                click("Focus " + focus + " " + d.id );
            }
      })
      ;

    group.append("text")
            .attr("x", function(d) { return (d.rx + d.width / 2); })
            .attr("y", function(d) { return (d.ry + d.height / 2); })
            .attr("dy", ".35em")
            .text(function(d) { return d.id; });

    group.exit().remove();

}

$: {
    var rect = d3.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .attr("x", function(d) { return d.rx; })
                .attr("y", function(d) { return d.ry; })
                .attr("width", function(d) { return d.width; })
                .attr("height", function(d) { return d.height; })
                .style("fill", function(d) { return d.color; })
                ;

    var image = d3.selectAll("image")
                    .data(data)
                    .transition()
                    .attr('xlink:href', function(d) { return d.src; })
                    .attr('width', function(d) { return d.width; })
                    .attr('height', function(d) { return d.height; })
                    .attr('x', function(d) { return d.rx; })
                    .attr('y', function(d) { return d.ry; })
                    .attr('stroke', 'black')
                    ;

    var text = d3.selectAll("text")
                .data(data)
                .transition()
                .attr("x", function(d) { return (d.rx + d.width / 2); })
                .attr("y", function(d) { return (d.ry + d.height / 2); })
                .attr("dy", ".35em")
                .text(function(d) { return d.id; });
/*
    // test rect
    var svg = d3.select("svg");
    var group = svg.selectAll("g")
                           .data(data, function(d) { return d; })
                           .enter()
                           .append("g")
                           //.attr("transform", "")
                           ;

    group.append("rect")
          .transition()
          .attr("x", function(d) { return d.rx; })
          .attr("y", function(d) { return d.ry; })
          .attr("width", function(d) { return d.width; })
          .attr("height", function(d) { return d.height; })
          .style("fill", function(d) { return d.color; })
          ;

    group.append("image")
      .attr('xlink:href', function(d) { return d.src; })
      .attr('width', function(d) { return d.width; })
      .attr('height', function(d) { return d.height; })
      .attr('x', function(d) { return d.rx; })
      .attr('y', function(d) { return d.ry; })
      .attr('stroke', 'black')
      .on("click", function(d, i) {
            let focus = d.focus;
            if( focus === 1)
            {
              console.log("Focus " + focus + " " + i + " " + d.id );

            }
            else{
                console.log("No Focus " + focus + " " + i  + " " + d.id );
                clicked_id = d.id;
                click("Focus " + focus + " " + d.id );
            }
      })
      ;

    group.append("text")
            .attr("x", function(d) { return (d.rx + d.width / 2); })
            .attr("y", function(d) { return (d.ry + d.height / 2); })
            .attr("dy", ".35em")
            .text(function(d) { return d.id; });

    group.exit().remove();
*/
}
</script>


