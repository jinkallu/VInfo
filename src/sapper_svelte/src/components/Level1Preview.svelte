<script>
    import D3Image from '../components/D3Image.svelte';
    import PlotPreview from '../components/PlotPreview.svelte';

    export let data = [];
    let id = undefined;
    let src;
    let height;
    let width;
    let ry_c;
    let rx_c;
    let mid;
     let new_data = [];
     let len;

export let svg;

let test = false;

    function arrayRotate(arr, reverse) {
        if (reverse) arr.unshift(arr.pop());
        else arr.push(arr.shift());

        return arr;
    }
    let new_d =function test()
    {
        return create();
    }
    //let new_d = function create()
    //{

//import { onMount } from 'svelte';
// onMount(() => {
//    create();
//}
//);

    function create(){


new_data = [];

    len = data.length;
    mid = len % 2 ? Math.floor(len / 2) : len / 2;

    let colors = ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'];

    // To the right
        let left_data = [];
        let right_data = [];

        let prev_x_c = data[0].rx_c;
        rx_c = data[0].rx_c;
        ry_c = data[0].ry_c;
        src = data[0].src;
        height = data[0].height;
        width = data[0].width;

        //let prev_width = data[0].width;
        for(let i = mid + 1; i < len; i++)
        {

            let new_h = height / ((i  - mid) * 1.5);
            let new_w = width / ((i  - mid) * 2);
            right_data.push(
                {
                    rx: prev_x_c + new_w / 2,
                    ry: ry_c - new_h / 2,
                    height: new_h,
                    width: new_w,
                    src: src,
                    color: colors[i - mid],
                    focus: 0,
                    id: data[i].id,
                    nodename: data[i].nodename
                }
            );
            prev_x_c = prev_x_c + new_w;
        }
        // To the left

        prev_x_c = rx_c;

        for(let i = 0; i < mid; i++)
        {
            let new_h = height / ((i + 1) * 1.5);
            let new_w = width / ((i + 1) * 2);

            left_data.push(
                {
                    rx: prev_x_c - new_w / 2 - new_w,
                    ry: ry_c - new_h / 2,
                    height: new_h,
                    width: new_w,
                    src: src,
                    color: colors[i + 1],
                    focus: 0,
                    id: data[i].id,
                    nodename: data[i].nodename
                }
            );
            prev_x_c = prev_x_c - new_w;
        }

        for(let i = left_data.length - 1; i >= 0; i--)
        {
            new_data.push(left_data[i]);
        }
        for(let i = right_data.length - 1; i >= 0; i--)
        {
        new_data.push(right_data[i]);


        }
        // root (middle data, now on focus)
        new_data.push(
            {
                rx: rx_c - width / 2,
                ry: ry_c - height / 2,
                height: height,
                width: width,
                src: src,
                color: colors[0],
                focus: 1,
                id: data[mid].id,
                nodename: data[mid].nodename
            }
        );

// reverse the order of left data
        for(let i = 0; i < mid; i++)
        {
            //console.log(data[i].id, new_data[i].id);
            new_data[i].id = data[i].id;
        }

        test = !test;
        new_data = new_data;
        return new_data;
        //new_d = new_data;
        //return test;
    }

    function handleClick() {
        if(id !== undefined)
        {
            let diff = data[mid].id - id;
            console.log(`clicked ${id} ` + `diff ${diff}`);
            while(diff !== 0)
            {
                if(diff < 0)
                {
                    data = arrayRotate(data, false);
                    diff ++;
                }
                else{
                    data = arrayRotate(data, true);
                    diff --;
                }

            }
        }


        new_d = create();
        for(let i = 0; i < data.length; i++)
        {
            console.log(data[i].id, new_d[i].id);
        }

    }
</script>

<D3Image  bind:data = {new_d}  bind:clicked_id = {id} on:click={handleClick}/>
<!--
{#each new_d as d}
    <PlotPreview {svg} data = {d} />
{/each}
-->
