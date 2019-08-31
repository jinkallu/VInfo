<script>
    import SelfAndSibblingsCarouselView from '../UI/SelfAndSibblingsCarouselView.svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();


    export let size_data;
    export let sibblings;
    export let self;

    let y_offset = 75;
    let x_offset = -100;

    let width = size_data[0].width + 200;
    let height = size_data[0].height + 150;


    let view_data = [];

    $: {
        let tmp_view_data = [];
        if(sibblings)
        {
            view_data = create();
        }
    }

    function arrayRotate(arr, reverse) {
        if (reverse) arr.unshift(arr.pop());
        else arr.push(arr.shift());

        return arr;
    }

    function create(){
        let new_data = [];

        let len = sibblings.length;
        let mid = len % 2 ? Math.floor(len / 2) : len / 2;
        console.log(mid);

        while(sibblings[mid].nodeid !== self.nodeid)
        {
            sibblings = arrayRotate(sibblings, false);
        }
        console.log(sibblings);

        // colors must be replaced with better logic
        let colors = ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'];

        // To the right
        let left_data = [];
        let right_data = [];

        let prev_x_c = size_data[0].rx + x_offset + width / 2;
        let rx_c = size_data[0].rx + x_offset + width / 2;
        let ry_c = size_data[0].ry + y_offset + height / 2;


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
                    focus: false,
                    //id: data[i].id,
                    nodename: sibblings[i].nodename, //data[i].nodename,
                    nodeid: sibblings[i].nodeid
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
                    //src: src,
                    color: colors[i + 1],
                    focus: false,
                    //id: data[i].id,
                    nodename: sibblings[i].nodename,
                    nodeid: sibblings[i].nodeid
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
                //src: src,
                color: colors[0],
                focus: true,
                ////id: data[mid].id,
                nodename: sibblings[mid].nodename,
                nodeid: sibblings[mid].nodeid
            }
        );

        // reverse the order of left data
        // This is not the best solution, but works
        for(let i = 0; i < mid; i++)
        {
            //new_data[i].id = sibblings[i].id;
            new_data[i].nodename = sibblings[i].nodename;
            new_data[i].nodeid = sibblings[i].nodeid;
            new_data[i].focus = false;
        }
        console.log(new_data);
        return new_data;
    }

    function handleClick(event) {
        console.log('clicked id', event.detail.nodeid);
        dispatch('click', {
            nodeid: event.detail.nodeid,
            focus: event.detail.focus
        });
    }
</script>

{#if view_data}
    {#each view_data as d}
        <SelfAndSibblingsCarouselView data = {d} on:click={handleClick}/>
    {/each}
{/if}
