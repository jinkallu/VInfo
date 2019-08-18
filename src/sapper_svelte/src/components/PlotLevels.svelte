<script>
    import PlotLevel0 from '../components/PlotLevel0.svelte';
    import PlotLevel1 from '../components/PlotLevel1.svelte';
    import PlotLevel2 from '../components/PlotLevel2.svelte';

    let svg;

    let level_0_data = [];
    let level_1_data = [];
    let level_2_data = [];

    // Level 0
    level_0_data.push({ name: "Root",
        rx: 300,
        ry: 50,
        width: 100,
        height: 50,
        color: "steelblue"
    });
    //
    // Level 1
    let src = 'preview.png';
    level_1_data.push({ name: "Root",
        rx: 300,
        ry: 150,
        width: 100,
        height: 50,
        color: "grey",
        src: src
    });
    level_1_data.push({ name: "Root",
        src: src
    });
    //
    // Level 2
    level_2_data.push({ name: "Root",
        rx: 300,
        ry: 450,
        width: 100,
        height: 50,
        color: "blue"
    });
    //
</script>

<PlotLevel0 data = {level_0_data} />
<PlotLevel1 data = {level_1_data} />
<PlotLevel2 data = {level_2_data} />

<svg bind:this={svg} width="1000" height="1000">
</svg>
