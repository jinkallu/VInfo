import { Histogram } from './histogram';
import { ItemProp } from './models/itemProp';

export class Properties {
     private static instance:Properties;

     private constructor() { }

     public static getInstance(): Properties {
          if (!Properties.instance) {
              Properties.instance = new Properties();
          }
            return Properties.instance;
      }


     create() {
          let properties_div = document.createElement("div");
          properties_div.setAttribute('id', 'properties');
          properties_div.style.position = "absolute";
          properties_div.style.border = "solid black";
          properties_div.style.top = "20%";
          properties_div.style.width = "18%";
          properties_div.style.left = "82%";
          properties_div.style.minHeight = "80%";


          let itemDiv = document.createElement('div');          
          itemDiv.setAttribute('id', 'itemName');
          itemDiv.style.margin = "5px";
          itemDiv.style.fontSize = '12px';
          itemDiv.style.fontWeight = "bold";
          itemDiv.style.textAlign = 'center';

          let propDiv = document.createElement('div');
          propDiv.style.background = 'lightgrey';
          propDiv.style.minHeight = "40%";
          propDiv.style.width = "90";
          propDiv.style.margin = "3%";
          propDiv.setAttribute('id', 'propDiv');
          propDiv.style.display = "flex";
          propDiv.style.flexDirection = "column";

        
          properties_div.appendChild(itemDiv);
          properties_div.appendChild(propDiv);

          let histogram = new Histogram();

          return properties_div;
     }

     addItems(itemProps: ItemProp[], instanceid: number) {
          console.log(itemProps);
     }
}