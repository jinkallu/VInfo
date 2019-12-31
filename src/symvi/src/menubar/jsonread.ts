//import {readFileSync} from 'fs'; 
//const fs = require('fs'); 
//import data from '/home/jinesh/Downloads/student.json';
//const word = (<any>data).name;
//console.log(word);
export class JSONRead{
    dummy_div: HTMLDivElement;

    constructor(){
        this.dummy_div = document.createElement("div");
        this.dummy_div.style.display = "none";
    }

    get(){
        return this.dummy_div;
    }

    openFile(file:any){
        //let rawdata = readFileSync('/home/jinesh/Downloads/student.json', 'utf8');
        //console.log("buffer ", rawdata); 
        //let student = JSON.parse(rawdata);
        //console.log("Parsed data \n", student);
        let reader = new FileReader();
        reader.readAsText(file);
        
        reader.addEventListener('load', this.loadFile);
    }

    loadFile = (evt: any) => {
        let json_dgm = JSON.parse(evt.target.result);
        //console.log("Parsed data \n", json_dgm.name);
        this.dummy_div.dispatchEvent(new CustomEvent("fileOpen", {
            bubbles: true,
            detail: { json_dgm:  json_dgm}
        }));
    }
}