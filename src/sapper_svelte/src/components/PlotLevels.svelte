<script>
    import PlotLevel0 from '../components/PlotLevel0.svelte';
    import PlotLevel1 from '../components/PlotLevel1.svelte';
    import PlotLevel2 from '../components/PlotLevel2.svelte';
    import Login from '../components/apicalls/Login.svelte';
    import ListNodes from '../components/apicalls/ListNodes.svelte';

    let svg;

    let level_0_data = [];
    let level_1_data = [];
    let level_2_data = [];

let login_data = [];
let node_data = [];
let flag  = false;

    // Level 0
    level_0_data.push({
        rx: 300,
        ry: 50,
        width: 100,
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
        width: 100,
        height: 50,
        color: "grey",
        src: src
    });
    //
    // Level 2
    level_2_data.push({
        rx: 300,
        ry: 450,
        width: 100,
        height: 50,
        color: "blue"
    });
    //

    $: console.log(node_data);
</script>

<!--<Login bind:data = {login_data}/> -->
<ListNodes bind:flag = {flag} bind:data = {node_data}/>



{#if flag}
    {level_0_data[0].name = node_data.parent.briefdesc}
    <PlotLevel0 data = {level_0_data} />
    <PlotLevel1 bind:data = {node_data} bind:size_data = {level_1_data} />
    <PlotLevel2 data = {level_2_data} />
{:else}
    Loading...
{/if}




<svg bind:this={svg} width="1000" height="500">
</svg>
