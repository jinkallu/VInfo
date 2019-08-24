<script>
    import D3Test from '../components/D3Test.svelte';
    import Preview from '../components/Level1Preview.svelte';

export let svg;
    export let data = [];
    export let size_data = [];
    let new_data = [];
    let data_flag = false;

    let y_offset = 75;
    let x_offset = -100;
    let width = size_data[0].width + 200;
    let height = size_data[0].height + 150;

    let new_d = function test()
    {
        return create();
    }

    function create()
    {
        new_data = [];
        /*new_data.push(
            {
                rx_c: size_data[0].rx + x_offset + width / 2,
                ry_c: size_data[0].ry + y_offset + height / 2,
                height: height,
                width: width,
                src: size_data[0].src,
                id: 0
            }
        );*/
        for(let i = 0; i < data.sibblings.length; i++)
        {
            new_data.push(
                {
                    rx_c: size_data[0].rx + x_offset + width / 2,
                    ry_c: size_data[0].ry + y_offset + height / 2,
                    height: height,
                    width: width,
                    src: size_data[0].src,
                    id:  i,
                    nodename: data.sibblings[i].nodename
                }
            );
        }
        new_data = new_data;
        return new_data;
    }

    $:
        {
            //data
            //data = create();
            new_d = create();
            console.log(data);
        }
</script>

<D3Test data = {size_data} />
<Preview {svg} data = {new_d}/>
