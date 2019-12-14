export class FileIO{
    data: any[];
    flag_ready: boolean;

    constructor(){
        this.data = [];
        this.flag_ready = false;
    }

    handleFileSelect (file:any) {
        this.flag_ready = false;
        let reader = new FileReader();
        reader.readAsText(file);

        reader.addEventListener('load', this.readFile);
    }

    readFile = (evt: any) => {
        let lines = evt.target.result.split(/\r?\n/);
        for(let i = 0; i < lines.length; i++){
            if (!(/\S/.test(lines[i]))) { // check if the test has at least one char
                continue; // if not continue
            }
             let colms = lines[i].trim().split(/\s+/);
             for(let j = 0; j < colms.length; j++){
                  let col = colms[j];
                  if(i === 0){
                       this.data.push(col);
                       this.data[this.data.length - 1] = [];
                  }
                  else{
                       this.data[j].push(col);
                  }
             }
        }

        for(let dat of this.data){
            console.log("Col");
                console.log(dat);
        }

        this.flag_ready = true;
    }

    processFileData(file_data: string){
        let lines = /*evt.target.result*/ file_data.split(/\r?\n/);
        for(let i = 0; i < lines.length; i++){
            if (!(/\S/.test(lines[i]))) { // check if the test has at least one char
                continue; // if not continue
            }
             let colms = lines[i].trim().split(/\s+/);
             for(let j = 0; j < colms.length; j++){
                  let col = colms[j];
                  if(i === 0){
                       this.data.push(col);
                       this.data[this.data.length - 1] = [];
                  }
                  else{
                       this.data[j].push(col);
                  }
             }
        }
    }

    get(){
        return this.data;
    }
}

