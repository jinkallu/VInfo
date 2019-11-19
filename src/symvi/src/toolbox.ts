import { Category } from './models/category.js';
import { CategoryApi } from './Api/categoryApi.js';
import { CategoryItem } from './models/categoryItem.js';
import { ItemProp } from './models/itemProp.js';
// import * as  $ from './js/jquery.js';
// import  './styles/toolbox_dd.css';
export class ToolBox {


    private _categories: Category[];

    constructor() {
        this._categories = CategoryApi.getCategories();
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

    createProperties(catItemId: string, catItemName: string) {
        let itemProps = CategoryApi.getItemPropsByItemId(catItemId);
        let propEl = document.getElementById('properties');
        let propDiv = document.getElementById('propDiv');
        let itemNameDiv= document.getElementById('itemName');
        itemNameDiv.textContent=catItemName.toUpperCase();
        propDiv.innerHTML = null;

        for (let itemProp of itemProps) {
            propDiv.appendChild(this.addProperties(itemProp));
        }
        // propDiv.textContent = catItemId;
        propEl.appendChild(itemNameDiv);

        propEl.appendChild(propDiv);

        // propEl.textContent = "working";
    }
    onImgClicked = (event: MouseEvent, id: string,name : string) => {

        this.createProperties(id, name);
    }
    onImgMouseEnter = (event: MouseEvent) => {
        console.log(event);
    }
    setAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                    panel.style.display = "none";
                } else {
                    panel.style.display = "block";
                }
            });

        }
    }

    craeteCatItems(catId: string) {
        let imgDiv = document.createElement('div');

        let categoryItems = CategoryApi.getCategoryItemsByCatId(catId);
        for (let catItems of categoryItems) {
            imgDiv.setAttribute("class", "flex-container");
            imgDiv.style.width="100%";
            imgDiv.style.justifyContent="space-between";
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
            imgEl.setAttribute("class", "flex-elem");
            imgEl.setAttribute('title', catItems.categoryName);
            imgEl.setAttribute('id', catItems.catItemId);
            imgDiv.appendChild(imgEl);
            imgEl.addEventListener('click', this.onImgClicked.bind(null, this, catItems.catItemId,catItems.categoryName))
            imgEl.addEventListener('onmouseenter', this.onImgMouseEnter.bind(this, { id: catItems.catItemId }))
        }
        return imgDiv;
    }

    createCategories(category: Category) {
        let categoryUi = document.createElement("div");
        categoryUi.style.width="90%";
        let categoryBtn = document.createElement("div");
        categoryBtn.setAttribute('class', "accordion");
        categoryBtn.textContent = category.categoryName.toUpperCase();
        categoryBtn.style.margin='2px';
        let divEl = document.createElement('div');
        divEl.setAttribute('class', 'panel');
        let ulEl = document.createElement('ul');
        divEl.appendChild(this.craeteCatItems(category.categoryId));
        categoryUi.appendChild(categoryBtn);
        categoryUi.appendChild(divEl);
        return categoryUi;

    }


    create(parentToolBox: HTMLDivElement) {
        var head = document.getElementsByTagName('HEAD')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './styles/toolbox_dd.css';
        head.appendChild(link);
        for (let category of this._categories) {
            parentToolBox.appendChild(this.createCategories(category));
        }
        this.setAccordion();

        // this.createProperties();
    }


}


