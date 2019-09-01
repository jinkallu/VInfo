<script>
    export let data;
</script>

<style>
    .level1 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:DarkTurquoise;
        color: white;
        position:absolute;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
</style>
{#each data as d}
    <div class = "level1"
         style="left: {d.rx + 'px'};
                top: {d.ry + 'px'};
                width: {d.width + 'px'};
                height: {d.height + 'px'}"
    >
        {d.name}
    </div>
{/each}
