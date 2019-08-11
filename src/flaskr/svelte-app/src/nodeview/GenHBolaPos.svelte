<script>

     import { createEventDispatcher } from 'svelte';

     export let node_names = ["Maths", "Arithmetic", "Algebra", "Geometry", "Calculus"];
     export let x_center = 600;
     export let y_center = 50;

     export let nodes_pos = [];

// Level 0
     nodes_pos.push({ name: "Root",   
               rx: x_center, 
               ry: y_center - 100})
//
     

     let n = node_names.length; // number of child nodes

     let x_init = x_center - (n/2 - 0.5) * 100;
// Level 1
     for (let i = 0; i < n; i++) {
          let x = x_init + (i) * 100;
          let x_tmp = x - x_center;
          let y = y_center + Math.pow(x_tmp, 2) / 1000; // parabola x^2 / 2
          console.log(x, x_tmp, y);
          nodes_pos.push({ name: node_names[i],   
               rx: x , 
               ry: y})

     }
//

// Level 2

     let theta = 2 * Math.PI;
     let r = 200; // radius of the circle on which 
          // the children nodes must be drawn.
          // it must be calculated by considering the number of children,
          // total canvas size and the child node text size. 
          
     
     //let n = node_names.length; // number of child nodes
     let d_theta = theta / (n - 1);

     

     for (let i = 1; i < n; i++) {
          nodes_pos.push({ name: node_names[i],   
               rx: x_center + r * Math.cos((i - 1) * d_theta),  // x = rcos(theta)
               ry: y_center + 400 + r * Math.sin((i - 1) * d_theta)}) // y = rsin(theta)
     }
</script>

<slot {nodes_pos} />