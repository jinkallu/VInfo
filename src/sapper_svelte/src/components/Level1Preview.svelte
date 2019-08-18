<script>
    import D3Image from '../components/D3Image.svelte';

    export let data = [];

    function create()
    {
        let new_data = [];

        //let xc = data[0].rx_c;
        //let yc = data[0].ry_c;

        //let width = data[0].width;
        //let height = data[0].height;

        //let root_x0 = xc - width / 2;
        //let root_y0 = yc - height / 2;

/*        let xOffset = -100;
        let yOffset = 100;

        let root_rx = xc - width / 2;
        let root_ry = yx - height / 2;


        let dx = 20;
        let dy = 25;
        let dH = 50;
        let dW = 100;

        let root_rx = data[0].rx + xOffset;
        let root_ry = data[0].ry + yOffset;
        let root_h = data[0].height + 100;
        let root_w = data[0].width + 200;

        let root_cx = root_rx + root_w / 2;
        let root_cy = root_ry + root_h / 2;

        let width = data[0].width + dW;
        let height = data[0].height + dH;


        new_data.push(
            {
                rx: root_cx + 4 * dx,
                ry: root_ry + 2 * dy,
                height: height / 2,
                width: width,
                src: data[0].src
            }
        );

        new_data.push(
            {
                rx: root_cx - 4 * dx - width,
                ry: root_ry + 2 * dy,
                height: height / 2,
                width: width,
                src: data[0].src
            }
        );

        new_data.push(
            {
                rx: root_cx + dx,
                ry: root_ry + dy,
                height: height,
                width: width,
                src: data[0].src
            }
        );
        new_data.push(
            {
                rx: root_cx - dx - width,
                ry: root_ry + dy,
                height: height,
                width: width,
                src: data[0].src
            }
        );


        let mult_rx, mult_ry, mult_height;
        for(let i = 6; i > 0; i--)
        {
            if(!(i % 2))
            {
                mult_rx = 2 * i;
                mult_ry = i / 2;
                mult_height = 2 / i;
                new_data.push(
                    {
                        rx: root_cx + mult_rx * dx,
                        ry: root_ry + mult_ry * dy,
                        height: height * mult_height,
                        width: width,
                        src: data[0].src
                    }
                );
             }
             else{
                new_data.push(
                    {
                        rx: root_cx - mult_rx * dx - width,
                        ry: root_ry + mult_ry * dy,
                        height: height * mult_height,
                        width: width,
                        src: data[0].src
                    }
                );
            }
        }

    */
    let colors = ['#696969', '#808080', '#A9A9A9', '#C0C0C0', '#D3D3D3', '#DCDCDC'];

    // To the right
        let right_data = [];
        let prev_x_c = data[0].rx_c;
        //let prev_width = data[0].width;
        for(let i = 0; i < 4; i++)
        {
            let new_h = data[0].height / ((i +1) * 1.5);
            let new_w = data[0].width / ((i + 1) * 2);
            right_data.push(
                {
                    rx: prev_x_c + new_w / 2,
                    ry: data[0].ry_c - new_h / 2,
                    height: new_h,
                    width: new_w,
                    src: data[0].src,
                    color: colors[i+1],
                    focus: 0
                }
            );
            prev_x_c = prev_x_c + new_w;
        }
        // To the left
        let left_data = [];
        prev_x_c = data[0].rx_c;
        for(let i = 0; i < 4; i++)
        {
            let new_h = data[0].height / ((i +1) * 1.5);
            let new_w = data[0].width / ((i + 1) * 2);

            left_data.push(
                {
                    rx: prev_x_c - new_w / 2 - new_w,
                    ry: data[0].ry_c - new_h / 2,
                    height: new_h,
                    width: new_w,
                    src: data[0].src,
                    color: colors[i+1],
                    focus: 0
                }
            );
            prev_x_c = prev_x_c - new_w;
        }
        for(let i = 3; i >= 0; i--)
        {
            new_data.push(left_data[i]);
            new_data.push(right_data[i]);
        }
        // root
        new_data.push(
            {
                rx: data[0].rx_c - data[0].width / 2,
                ry: data[0].ry_c - data[0].height / 2,
                height: data[0].height,
                width: data[0].width,
                src: data[0].src,
                color: colors[0],
                focus: 1
            }
        );


        return new_data;
    }
</script>

<D3Image data = {create()}/>

