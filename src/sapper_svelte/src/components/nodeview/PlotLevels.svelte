<script>
    import PlotLevel0 from './PlotLevel0.svelte';
    import PlotLevel1 from './PlotLevel1.svelte';
    import PlotLevel2 from './PlotLevel2.svelte';
    import Login from '../apicalls/Login.svelte';
    import ListNodes from '../apicalls/ListNodes.svelte';

    let svg;

    let level_0_data = [];
    let level_1_data = [];
    let level_2_data = [];

let login_data = [];
let node_data = [];
let flag  = false;
let nodeid = "79293b9b-dd81-46aa-b914-d4749e6e4e11";

    // Level 0
    level_0_data.push({
        rx: 300,
        ry: 50,
        width: 150,
        height: 50,
        color: "steelblue",
        name: ""
    });
    //
    // Level 1
    let src = 'preview.png';
    level_1_data.push({
        rx: 300,
        ry: 150,
        width: 150,
        height: 50,
        color: "grey",
        src: src
    });
    //
    // Level 2
    level_2_data.push({
        rx: 300,
        ry: 450,
        width: 150,
        height: 50,
        color: "blue"
    });
    //

    //$: console.log(node_data);
    function handleClick(event) {
        console.log('clicked id from levels', event.detail.id);
        nodeid = event.detail.nodeid;
        flag = false;
    }
</script>

<!--<Login bind:data = {login_data}/> -->




{#if flag}
    <PlotLevel0 data = {node_data.parent.nodename} size_data = {level_0_data} />
    <PlotLevel1 {svg} data = {node_data} size_data = {level_1_data} on:click={handleClick}/>
    <PlotLevel2 data = {node_data.children} size_data = {level_2_data} />
{:else}
    <ListNodes bind:flag = {flag} bind:data = {node_data} nodeid = {nodeid}/>
    Loading...
{/if}




<svg bind:this={svg} width="1000" height="500">
</svg>

