<script>
    import SelfAndSibblingsNormView from '../UI/SelfAndSibblingsNormView.svelte';

    export let size_data;
    export let sibblings;
    let color = 'DarkTurquoise';

    let view_data = [];

    $: {
        let tmp_view_data = [];
        if(sibblings)
        {
            for(let i = 0; i < sibblings.length; i++)
            {
                tmp_view_data.push({
                    rx: size_data[0].rx + i * (size_data[0].width + 10) - ((sibblings.length - 1) * (size_data[0].width + 10) / 2),
                    ry: size_data[0].ry,
                    width: size_data[0].width,
                    height: size_data[0].height,
                    color: color,
                    name: sibblings[i].nodename
                });
            }

            view_data = tmp_view_data;
        }
    }
</script>

{#if sibblings}
    <SelfAndSibblingsNormView data = {view_data}/>
{/if}
