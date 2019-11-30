import { Histogram } from '../histogram';
import { ItemProp } from '../models/itemProp';
import { PropertyItem } from '../propertyItem';

import { DesignApi } from '../Api/designApi';

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

     clearProps(){
          this.propDiv.innerHTML=null;
     }

     addProperties(itemProp: ItemProp, instanceid: number) {
         


          let divEl = document.createElement('div');
          divEl.style.display = "flex";
          divEl.style.justifyContent = "space-between";
          divEl.style.flexDirection = 'row';
          divEl.style.margin = '5px';

          let inEl = document.createElement('input');
          inEl.setAttribute('id', instanceid + '_' + itemProp.propId);
          inEl.setAttribute('placeholder', itemProp.propName);
          if (itemProp.propVal != null) {

               inEl.value = itemProp.propVal;
          }
          inEl.addEventListener('change', function () {
               console.log("printing component" + instanceid);
               // let comp=DesignApi.getComponentByInstId(instanceid);
               // console.log(comp);
               DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
          });
          let lblEl = document.createElement('label');
          lblEl.textContent = itemProp.propName.toUpperCase();
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
          divEl.appendChild(lblEl)
          divEl.appendChild(inEl)
          return divEl;


     }

     addItems(itemProps: ItemProp[], instanceid: number) {
          // let propEl = document.getElementById('properties');
          // let propDiv = document.getElementById('propDiv');
          // let itemNameDiv= document.getElementById('itemName');
          // // itemNameDiv.textContent=catItemName.toUpperCase();
          this.propDiv.innerHTML = "";

          let propContainer=document.createElement('div');
          propContainer.style.display="flex";
          propContainer.style.justifyContent="space-around";
          propContainer.style.flexDirection = 'column';

          let instHeader=document.createElement('p');
          instHeader.textContent=instanceid.toString();

          propContainer.appendChild(instHeader);

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








     // addItems(itemProps: ItemProp[], instanceid: number) {
     //      console.log(itemProps);
     // }
}