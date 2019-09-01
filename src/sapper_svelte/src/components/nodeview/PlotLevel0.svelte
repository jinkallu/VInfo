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
        new_data.push({
            rx: size_data[0].rx,
            ry: size_data[0].ry,
            width: size_data[0].width,
            height: size_data[0].height,
            color: size_data[0].color,
            name: data
        });

        new_data = new_data;
        return new_data;
    }
</script>

<D3Test data = {new_d} />

