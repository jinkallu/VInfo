import { Histogram } from '../histogram';
import { ItemProp } from '../models/itemProp';
import { PropertyItem } from '../propertyItem';

import { DesignApi } from '../Api/designApi';
import {CategoryApi} from '../Api/categoryApi';

export class Properties {
     private static instance: Properties;
     propDiv: HTMLDivElement;
     properties_div: HTMLDivElement;

     private constructor() { }

     public static getInstance(): Properties {
          if (!Properties.instance) {
               Properties.instance = new Properties();
          }
          return Properties.instance;
     }


     create() {
          this.properties_div = document.createElement("div");
          this.properties_div.setAttribute('id', 'properties');
          this.properties_div.style.position = "absolute";
          //this.properties_div.style.border = "solid black";
          this.properties_div.style.top = "7%";
          this.properties_div.style.width = "100%";
          //this.properties_div.style.left = "82%";
          this.properties_div.style.minHeight = "80%";


          let itemDiv = document.createElement('div');
          itemDiv.setAttribute('id', 'itemName');
          itemDiv.style.margin = "5px";
          itemDiv.style.fontSize = '12px';
          itemDiv.style.fontWeight = "bold";
          itemDiv.style.textAlign = 'center';

          this.propDiv = document.createElement('div');
          this.propDiv.style.background = 'lightgrey';
          this.propDiv.style.minHeight = "40%";
          this.propDiv.style.width = "90";
          this.propDiv.style.margin = "3%";
          this.propDiv.setAttribute('id', 'this.propDiv');
          this.propDiv.style.display = "flex";
          this.propDiv.style.flexDirection = "column";


          this.properties_div.appendChild(itemDiv);
          this.properties_div.appendChild(this.propDiv);

          let histogram = new Histogram();

          return this.properties_div;
     }

     onChange() {
          console.log()
     }

     clearProps() {
          this.propDiv.innerHTML = null;
     }
     createTextElement(itemProp: ItemProp, instanceid: number) {
          let inEl = document.createElement('input');
          inEl.setAttribute('id', instanceid + '_' + itemProp.propId);
          inEl.setAttribute('placeholder', itemProp.propName);
          if (itemProp.propDefVal) {

               inEl.value = itemProp.propDefVal;
          }
          if (itemProp.propVal != null) {

               inEl.value = itemProp.propVal;
          }
          inEl.addEventListener('change', function () {
               DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
          });
          switch (itemProp.propType) {

               case 'string':
                    inEl.setAttribute('type', 'text');

                    break;
               case 'number':
                    inEl.setAttribute('type', 'number');
                    break;
               case 'date':
                    inEl.setAttribute('type', 'date');
                    break;

          }
          return inEl;
     }
     createFileElement(itemProp: ItemProp, instanceid: number){
          let fileEl=document.createElement('input');
          fileEl.setAttribute('type','file');
          fileEl.setAttribute('name',instanceid + '_' + itemProp.propId);
          fileEl.setAttribute('id',instanceid + '_' + itemProp.propId);
          fileEl.addEventListener('change', function () {
               DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
          });

          fileEl.addEventListener('change', this.handleFileSelect, false);

          return fileEl;

     }


     createSelectElement(itemProp: ItemProp, instanceid: number) {
          let selEl=document.createElement('select');
          selEl.setAttribute('id', instanceid + '_' + itemProp.propId);

          selEl.style.maxWidth="90%";

          selEl.addEventListener('change', function () {
               DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
          });

          let options=CategoryApi.getLookupItems(itemProp.propId);

               for (let opt of options){
                    let optEl=document.createElement('OPTION');
                    optEl.setAttribute('value',opt.lookupId);
                    optEl.setAttribute('label',opt.lookupVal);
                    selEl.appendChild(optEl);
               }

          return selEl;



      }

     addProperties(itemProp: ItemProp, instanceid: number) {

          let divEl = document.createElement('div');
          divEl.style.display = "flex";
          divEl.style.justifyContent = "space-between";
          divEl.style.flexDirection = 'row';
          divEl.style.margin = '5px';

          let lblEl = document.createElement('label');
          lblEl.textContent = itemProp.propName.toUpperCase();
          
          divEl.appendChild(lblEl)
          switch (itemProp.propSpec) {
               case 'text':
                    divEl.appendChild(this.createTextElement(itemProp, instanceid));
                    break;
               case 'select':
                    divEl.appendChild(this.createSelectElement(itemProp,instanceid));
                    break;
               case 'file':
                    divEl.appendChild(this.createFileElement(itemProp,instanceid));
                    break;
          }

          return divEl;


     }

     addItems(itemProps: ItemProp[], instanceid: number) {
          // let propEl = document.getElementById('properties');
          // let propDiv = document.getElementById('propDiv');
          // let itemNameDiv= document.getElementById('itemName');
          // // itemNameDiv.textContent=catItemName.toUpperCase();
          this.propDiv.innerHTML = "";

          let propContainer = document.createElement('div');
          propContainer.style.display = "flex";
          propContainer.style.justifyContent = "space-around";
          propContainer.style.flexDirection = 'column';

          // let instHeader = document.createElement('p');
          // instHeader.textContent = instanceid.toString();

          // propContainer.appendChild(instHeader);

          for (let itemProp of itemProps) {
               propContainer.appendChild(this.addProperties(itemProp, instanceid));
          }

          this.propDiv.appendChild(propContainer);

          // propDiv.textContent = catItemId;
          // this.properties_div.appendChild(itemNameDiv);
          //this.properties_div.innerHTML = "";
          //this.properties_div.appendChild(this.propDiv);
          // propEl.textContent = "working";
     }



     handleFileSelect = (evt:any) => {
          let file = evt.target.files[0]; // FileList object
          console.log(file);
          let reader = new FileReader();
          reader.readAsText(file);

          reader.addEventListener('load', this.readFile);
     }

     readFile = (evt: any) => {
          let data:any[];
          data = [];
          let lines = evt.target.result.split(/\r?\n/);
          for(let i = 0; i < lines.length; i++){
               let colms = lines[i].split('\s*');
               for(let j = 0; j < colms.length; j++){
                    let col = colms[j];
                    if(i === 0){
                         data.push(col);
                         data[data.length - 1] = [];
                    }
                    else{
                         data[j].push(col);
                    }
               }
          }

          for(let dat of data){
               console.log("Col");
               for(let d of dat){
                    console.log(d);
               }
          }
     }


     // addItems(itemProps: ItemProp[], instanceid: number) {
     //      console.log(itemProps);
     // }
}