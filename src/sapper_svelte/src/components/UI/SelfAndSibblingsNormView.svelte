<script>
    export let data;
</script>

<style>
    .level0 {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color:Navy;
        color: white;
        position:absolute;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    }
</style>
{#if data}
    <div class = "level0"
         style="left: {data.rx + 'px'};
                top: {data.ry + 'px'};
                width: {data.width + 'px'};
                height: {data.height + 'px'};
                background-color: {data.color}"
    >
        {data.name}
    </div>
{/if}
