<script>
    import D3Test from '../d3/D3Test.svelte';
    import Preview from './Level1Preview.svelte';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

export let svg;
    export let data = [];
    export let size_data = [];
    let new_data = [];
    let new_data_level = [];
    let data_flag = false;

    let y_offset = 75;
    let x_offset = -100;
    let width = size_data[0].width + 200;
    let height = size_data[0].height + 150;

    let new_d_level = function create_newd()
    {
        new_data_level = [];
        for(let i = 0; i < data.sibblings.length; i++)
        {
            new_data_level.push({
                rx: size_data[0].rx + i * (size_data[0].width + 10) - ((data.sibblings.length - 1) * (size_data[0].width + 10) / 2),
                ry: size_data[0].ry,
                width: size_data[0].width,
                height: size_data[0].height,
                color: size_data[0].color,
                name: data.sibblings[i].nodename
            });
        }

        new_data_level = new_data_level;
        return new_data_level;
    }

let new_d =
    function test()
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
                    nodename: data.sibblings[i].nodename,
                    nodeid: data.sibblings[i].nodeid,
                    focus: (data.sibblings[i].nodeid === data.self.nodeid) ? true : false
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
            //new_d = create();
            console.log(data);
        }

    function handleClick(event) {
        console.log('clicked id from level 1', event.detail.id);
        dispatch('click', {
            id: event.detail.id,
            nodeid: event.detail.nodeid
        });
    }
</script>

<D3Test data = {new_d_level} />
<Preview {svg} data = {new_d()} on:click={handleClick}/>
