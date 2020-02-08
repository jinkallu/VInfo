export class VideoEditor{
    editor_div: HTMLDivElement;

    constructor(){
        let body: HTMLBodyElement = document.body as HTMLBodyElement;
        body.style.width = "100%";
        body.style.height = "100%";
        body.style.background = "#FFFFFF";

        let main_div = document.createElement("div");
        body.appendChild(main_div);

        let add_button: HTMLButtonElement = document.createElement("button");
        add_button.innerHTML = "Add video";
        add_button.addEventListener("click", this.add);
        main_div.appendChild(add_button);

        let add_image_button: HTMLButtonElement = document.createElement("button");
        add_image_button.innerHTML = "Add text";
        add_image_button.addEventListener("click", this.addText);
        main_div.appendChild(add_image_button);

        let renderer: HTMLButtonElement = document.createElement("button");
        renderer.innerHTML = "Render";
        renderer.addEventListener("click", this.render);
        main_div.appendChild(renderer);
        
        this.editor_div = document.createElement("div");
        this.editor_div.style.display = "flex";
        //this.editor_div.style.flexDirection = "row";
        this.editor_div.style.flexWrap = "wrap";

        main_div.appendChild(this.editor_div);
    }

    render = () => {
        let commands: string;

        let ffmpeg_command = "ffmpeg";
        
        let child_divs = this.editor_div.getElementsByTagName("div");
        // create images with text
        let images_text = [];
        let image_names = [];
        let images_duration = [];
        let images_begin = []
        let img_cnt = 0;
        for (let div of child_divs){
            let images  = div.getElementsByTagName("img");
            if (images.length < 1){
                continue;
            } 
            let texts = div.getElementsByTagName("input");
            if (texts.length < 1){
                continue;
            }

            for (let text of texts){
                console.log("inputs", text.value);
            }

            let text = texts[0].value;
            let color = texts[1].value;
            let size = texts[2].value;
            let bgcolor = texts[3].value;
            let duration = texts[5].value;

            let img_name = img_cnt.toString() + ".png";
            image_names.push(img_name);
            images_duration.push(duration);
            images_text.push(text);
            let command = "convert -background '" + bgcolor  + "' -fill '" + color + "' -font Candice -size 1920x1080  -pointsize " + size + "  -gravity center label:" + text + " " + img_name;
            //this.getTranslation(text);
            commands += command + "\n";
            img_cnt++;
        }


        let total_media = 0;
        let i_img = 0;
        let time: number = 0;
        for (let div of child_divs){
            let inputs = div.getElementsByTagName("input");
            for (let input of inputs){
                if (input.type != "file"){
                    continue;
                }
                let videos  = div.getElementsByTagName("video");
                for (let video of videos){
                    
                    let sliders  = div.getElementsByTagName("input");
                    let slider_cnt = 0;
                    let start, duration;
                    for (let slider of sliders){
                        if (slider.type != "range"){
                            continue;
                        }
                        if(slider_cnt == 0){
                            start = slider.value;
                        }
                        else if(slider_cnt == 1){
                            duration = (+slider.value - +start).toString();
                        }
                        slider_cnt++;
                    }
                    ffmpeg_command += " -ss " + start + " -t " + duration;
                    time += +duration;
                    ffmpeg_command += " -i " + input.files[0].name; // video
                    total_media ++;
                    break;
                }
                
                let images  = div.getElementsByTagName("img");
                for (let img of images){
                    ffmpeg_command += " -loop 1 -framerate 30 -t " + images_duration[i_img] + " -i " + image_names[i_img]; 
                    images_begin.push(time);
                    time += +images_duration[i_img]
                    i_img++;
                    total_media ++;

                    break;
                }
            }
            /*
            let imgs  = div.getElementsByTagName("img");

            for (let img of imgs){
                ffmpeg_command += " -i " + img.src;
            }

            let videos  = div.getElementsByTagName("video");

            for (let video of videos){
                ffmpeg_command += " -i " + video.src;
            }*/
        }
        ffmpeg_command += " -filter_complex '";
        for (let total = 0; total < total_media; total++){
            ffmpeg_command += " [" + total.toString() + "]";
        }
        ffmpeg_command += " concat=n=" + total_media + ":v=1:a=0' video.mp4 ";

        console.log(ffmpeg_command);
        commands += ffmpeg_command;

        this.saveFileSRT(images_text, images_begin, images_duration)

        this.saveFile(commands);
    } 

    async getTranslation(text:any){
        console.log(text)
        let data_snd: any = {'translate': text};
        let host = self.location.origin
        console.log("Send data " , host);
            // let response = await fetch('http://34.65.89.94:5000/api/calc', {
            let response = await fetch(host + '/symvi' + '/translate', {

                method: 'POST',
        
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify(data_snd)
            });
            let msg;
            let data:any = await response.json();

            console.log(data);
    }

    saveFileSRT(images_text: string[], images_begin: number[], images_duration: string[]){
        // save file
        let text: string = "";
        for (let i = 0; i < images_text.length; i++){
            text += (i+1).toString() + "\n";
            text += new Date(images_begin[i] * 1000).toISOString().substr(11, 8) + " --> " + new Date((images_begin[i] +  +images_duration[i]) * 1000).toISOString().substr(11, 8)+ "\n";
            text += images_text[i] + "\n\n";
        }
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "test.srt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    saveFile(text: string){
        // save file

        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "test.sh");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    addText = () => {
        let img_div = document.createElement("div");
        // text
        let text = document.createElement("input");
        text.type = "text";
        text.id = "text";
        text.addEventListener("input", this.textChanged);


        let label_text = document.createElement("label");
        label_text.htmlFor = "text";
        label_text.innerHTML = "Text";

        img_div.appendChild(label_text);
        img_div.appendChild(text);

        // text color

        let text_color = document.createElement("input");
        text_color.type = "text";
        text_color.id = "text_color";
        text_color.addEventListener("input", this.textColorChanged);


        let label_text_color = document.createElement("label");
        label_text_color.htmlFor = "text_color";
        label_text_color.innerHTML = "Text color";

        img_div.appendChild(label_text_color);
        img_div.appendChild(text_color);

        // text size

        let text_size = document.createElement("input");
        text_size.type = "text";
        text_size.id = "text_size";
        text_size.addEventListener("input", this.textSizeChanged);


        let label_text_size = document.createElement("label");
        label_text_size.htmlFor = "text_size";
        label_text_size.innerHTML = "Text size";

        img_div.appendChild(label_text_size);
        img_div.appendChild(text_size);

        // background color
        let background_color = document.createElement("input");
        background_color.type = "text";
        background_color.id = "color";
        background_color.addEventListener("input", this.colorChanged);

        let label_color = document.createElement("label");
        label_color.htmlFor = "color";
        label_color.innerHTML = "Background color";

        img_div.appendChild(label_color);
        img_div.appendChild(background_color);

        let img_selector = document.createElement("input");
        img_selector.type = "file";
        img_selector.id = "image";
        img_selector.addEventListener("change", this.processImgOpen);

        let label_image = document.createElement("label");
        label_image.htmlFor = "image";
        label_image.innerHTML = "Background image";

        img_div.appendChild(label_image);
        img_div.appendChild(img_selector);

        // image duration
        let image_duration = document.createElement("input");
        image_duration.type = "text";
        image_duration.id = "duration";
        //image_duration.addEventListener("input", this.colorChanged);

        let label_duration = document.createElement("label");
        label_duration.htmlFor = "color";
        label_duration.innerHTML = "Duration";

        img_div.appendChild(label_duration);
        img_div.appendChild(image_duration);

        let img = document.createElement("img");
        img.style.width = "40%";
        img_div.appendChild(img);



        let holder_div = document.createElement("div");
        holder_div.style.width = "40%";
        holder_div.style.height = "100%";
        holder_div.style.backgroundSize = "contain";
        holder_div.style.textAlign = "center";
        holder_div.style.margin = "auto";
        //holder_div.style.padding = "2rem";



        img_div.appendChild(holder_div);

        this.editor_div.appendChild(img_div);
    }

    textColorChanged = (evt: any) => {
        let div_holder = evt.target.parentElement.getElementsByTagName("div")[0];
        div_holder.style.color = evt.target.value;
    }

    textSizeChanged = (evt: any) => {
        let div_holder = evt.target.parentElement.getElementsByTagName("div")[0];
        div_holder.style.fontSize = evt.target.value + "px";
    }

    textChanged = (evt: any) => {
        let div_holder = evt.target.parentElement.getElementsByTagName("div")[0];
        div_holder.innerHTML = evt.target.value;
    }

    colorChanged = (evt: any) => {
        let div_holder = evt.target.parentElement.getElementsByTagName("div")[0];
        console.log(evt.target.value)
        div_holder.style.backgroundColor = evt.target.value;
    }

    add = () => {
        console.log("Clicked");
        let video_div = document.createElement("div");

        let video_selector = document.createElement("input");
        video_selector.type = "file";
        video_selector.addEventListener("change", this.processOpen);

        video_div.appendChild(video_selector);

        let video = document.createElement("video");
        //video.style.width = "40%";
        video.controls = true;
        //video.style.height = 8

        video_div.appendChild(video);

        let start_slider = document.createElement("input");
        start_slider.type = "range";
        start_slider.max = video.duration.toString();
        start_slider.min = "0";
        start_slider.value = start_slider.min;
        start_slider.step = (video.duration / 500).toString();
        start_slider.addEventListener("input", this.sliderStartChange);
        start_slider.style.width = "100%";

        video_div.appendChild(start_slider);

        let stop_slider = document.createElement("input");
        stop_slider.type = "range";
        stop_slider.max = video.duration.toString();
        stop_slider.min = "0";
        stop_slider.value = stop_slider.max;
        //this.setStopSliderMin(stop_slider, start_slider.min);

        video_div.appendChild(stop_slider);
        stop_slider.style.width = "100%";
        stop_slider.addEventListener("input", this.sliderStopChange);


        this.editor_div.appendChild(video_div);
    }

    /*setStopSliderMin(slider: any, num: string){
        let min = +num + 1;
        slider.min = min.toString()
    }*/

    processOpen = (evt: any) => {
        let video = evt.target.parentElement.getElementsByTagName("video")[0];

        if(evt.target.value == ""){
            video.src = "";
            return;
        }

        let objectURL = URL.createObjectURL(evt.target.files[0]);
        video.src = objectURL;
        let sliders = evt.target.parentElement.getElementsByTagName("input");
        for (let slider of sliders){
            if (slider.type != "range"){
                continue;
            }
            slider.max = video.duration.toString();
            slider.step = (video.duration / 500).toString();
        }
        console.log(evt.target.files[0]);
    }

    processImgOpen = (evt: any) => {
        let img = evt.target.parentElement.getElementsByTagName("img")[0];
        let div_holder = evt.target.parentElement.getElementsByTagName("div")[0];

        if(evt.target.value == ""){
            img.src = "";
            return;
        }

        let objectURL = URL.createObjectURL(evt.target.files[0]);
        //img.src = objectURL;
        div_holder.style.backgroundImage = "url(" + objectURL + ")";
        
    }

    sliderStartChange = (evt: any) => {
        evt.target.parentElement.getElementsByTagName("video")[0].currentTime = evt.target.value;
    }

    sliderStopChange = (evt: any) => {
        evt.target.parentElement.getElementsByTagName("video")[0].currentTime = evt.target.value;
    }
}
