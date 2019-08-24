<script>
    import D3Test from '../d3/D3Test.svelte';

    export let data = undefined;
    export let size_data = undefined;

    let new_data = [];

    let new_d = function test()
    {
        return create();
    }

    function create()
    {
        new_data = [];
        for(let i = 0; i < data.length; i++)
        {
            new_data.push({
                rx: size_data[0].rx + i * (size_data[0].width + 10) - ((data.length - 1) * (size_data[0].width + 10) / 2),
                ry: size_data[0].ry,
                width: size_data[0].width,
                height: size_data[0].height,
                color: size_data[0].color,
                name: data[i].nodename
            });
        }

        new_data = new_data;
        return new_data;
    }
</script>

<D3Test data = {new_d} />
