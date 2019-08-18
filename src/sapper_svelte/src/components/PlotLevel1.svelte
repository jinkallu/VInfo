<script>
    import D3Test from '../components/D3Test.svelte';
    import Preview from '../components/Level1Preview.svelte';

    export let data = [];

    let y_offset = 75;
    let x_offset = -100;
    let width = data[0].width + 200;
    let height = data[0].height + 150;

    function create()
    {
        let new_data = [];
        new_data.push(
            {
                rx_c: data[0].rx + x_offset + width / 2,
                ry_c: data[0].ry + y_offset + height / 2,
                height: height,
                width: width,
                src: data[0].src
            }
        );

        return new_data;
    }
</script>

<D3Test data = {data} />
<Preview data = {create()}/>
