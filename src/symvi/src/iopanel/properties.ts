import { Histogram } from '../histogram';
import { ItemProp } from '../models/itemProp';
import { PropertyItem } from '../propertyItem';

import { DesignApi } from '../Api/designApi';
import {CategoryApi} from '../Api/categoryApi';

import * as MATH from 'mathjs';
// import * as MathJax from "MathJax";

//MathJax.Hub.Config({tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}});

//MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

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
          fileEl.setAttribute('instanceid', instanceid.toString());
          fileEl.setAttribute('propid', itemProp.propId.toString());
          fileEl.addEventListener('change', function (evt:any) {
               DesignApi.addPropVal(instanceid, itemProp.propId, evt.target.files[0]/*this.value*/);
          });
          fileEl.addEventListener('change', this.handleFileSelect);
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

     
     createFormulaElement(itemProp: ItemProp, instanceid: number){
          let formulaDiv = document.createElement('div');

          let formulaEl = document.createElement('input');
          formulaEl.setAttribute('type','text');
          formulaEl.setAttribute('name',instanceid + '_' + itemProp.propId);
          formulaEl.setAttribute('id',instanceid + '_' + itemProp.propId);

          let formulaTexEl = document.createElement('div');
          formulaTexEl.style.overflowX = "auto";
          formulaEl.value=itemProp.propVal;
          formulaTexEl.innerHTML=itemProp.propVal;
          //formulaTexEl.innerHTML = '$$' + MATH.parse("sqrt(75 / 3) + det([[-1, 2], [3, 1]]) - sin(pi / 4)^2").toTex({parenthesis: 'keep'}) + '$$';
          //MathJax.Hub.Queue(["Typeset", MathJax.Hub, formulaTexEl]);

      
          formulaEl.addEventListener('input', function (evt:any) {
               DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
               console.log("formula");
               console.log(this.value);
               let parsed = "";
               try{
                    let val = evt.target.value;
                    if(val !== ""){
                         parsed = MATH.parse(val).toTex({parenthesis: 'keep'});
                         formulaTexEl.innerHTML = '$$' + parsed + '$$';
                         MathJax.Hub.Queue(["Typeset", MathJax.Hub,formulaTexEl]);
                    }
                    else{
                         formulaTexEl.innerHTML = "";
                    }
               }catch(error){
                    parsed = error;
               }
          });

          // formulaEl.addEventListener("input", this.inputFormula);
          formulaDiv.appendChild(formulaEl);
          formulaDiv.appendChild(formulaTexEl);

          return formulaDiv;
     }

     // inputFormula(evt:any){
     //      let parent = evt.target.parentElement;
     //      let tex_div = parent.getElementsByTagName("div");

     //      let parsed = "";
     //      try{
     //           let val = evt.target.value;
     //           if(val !== ""){
     //                parsed = MATH.parse(val).toTex({parenthesis: 'keep'});
     //                tex_div[0].innerHTML = '$$' + parsed + '$$';
     //                MathJax.Hub.Queue(["Typeset", MathJax.Hub, tex_div[0]]);
     //           }
     //           else{
     //                tex_div[0].innerHTML = "";
     //           }
     //      }catch(error){
     //           parsed = error;
     //      }
          

     // }


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
               case 'formula':
                    divEl.appendChild(this.createFormulaElement(itemProp,instanceid));
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
               console.log("Adding");
               let prop = this.addProperties(itemProp, instanceid);
               propContainer.appendChild(prop);
               let formula_parent = prop.getElementsByTagName("div");
               if(formula_parent.length > 0){
                    let formula = formula_parent[0].getElementsByTagName("div");
                    if(formula !== null)
                    {
                         MathJax.Hub.Queue(["Typeset", MathJax.Hub, formula[0]]);
                    }
               }
          }

          this.propDiv.appendChild(propContainer);

          // propDiv.textContent = catItemId;
          // this.properties_div.appendChild(itemNameDiv);
          //this.properties_div.innerHTML = "";
          //this.properties_div.appendChild(this.propDiv);
          // propEl.textContent = "working";

     }



     handleFileSelect = (event:any) => {
          let file = event.target.files[0]; // FileList object
          console.log("File ", file);
          let reader = new FileReader();
          reader.readAsText(file);
          let instanceid = Number(event.target.getAttribute("instanceid"));
          let propid = event.target.getAttribute("propid");

          reader.addEventListener('load', function(evt:any){
               DesignApi.addPropVal(instanceid, propid, evt.target.result);
          });
     }
}