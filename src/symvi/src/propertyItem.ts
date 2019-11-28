import {ItemProp} from './models/itemProp';
export class PropertyItem{
    

    constructor(){

    }

    addProperties(itemProp: ItemProp) {
        let divEl = document.createElement('div');
        divEl.style.display = "flex";
        divEl.style.justifyContent="space-between";
        divEl.style.flexDirection = 'row';
        divEl.style.margin='5px';

        let inEl = document.createElement('input');
        inEl.setAttribute('id',itemProp.propId);
        inEl.setAttribute('placeholder',itemProp.propName);
        let lblEl=document.createElement('label');
        lblEl.textContent=itemProp.propName.toUpperCase();
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
}