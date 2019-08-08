<script>
     export let node_names = ["Maths", "Arithmetic", "Algebra", "Geometry"];
     export let x = 500; // center pos x
     export let y = 500; // center pos y

     let nodes_pos = [{ name: node_names[0],        
          rx: x, 
          ry: y}]; // parent

     let theta = 2 * Math.PI;
     let r = 200; // radius of the circle on which 
          // the children nodes must be drawn.
          // it must be calculated by considering the number of children,
          // total canvas size and the child node text size. 
          
     
     let n = node_names.length; // number of child nodes
     let d_theta = theta / (n - 1);

     

     for (let i = 1; i < n; i++) {
          nodes_pos.push({ name: node_names[i],   
               rx: x + r * Math.cos((i - 1) * d_theta),  // x = rcos(theta)
               ry: y + r * Math.sin((i - 1) * d_theta)}) // y = rsin(theta)
     }

</script>

<slot {nodes_pos} />