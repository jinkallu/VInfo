import { CategoryApi } from './Api/categoryApi.js';
export class ToolBox {
    constructor() {
        this.onImgClicked = (event, id, name) => {
            this.createProperties(id, name);
        };
        this.onImgMouseEnter = (event) => {
            console.log(event);
        };
        this._categories = CategoryApi.getCategories();
    }
    addProperties(itemProp) {
        console.log(itemProp.propType);
        let divEl = document.createElement('div');
        divEl.style.display = "flex";
        divEl.style.justifyContent = "space-between";
        divEl.style.flexDirection = 'row';
        divEl.style.margin = '5px';
        let inEl = document.createElement('input');
        inEl.setAttribute('id', itemProp.propId);
        inEl.setAttribute('placeholder', itemProp.propName);
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
        divEl.appendChild(lblEl);
        divEl.appendChild(inEl);
        return divEl;
    }
    createProperties(catItemId, catItemName) {
        let itemProps = CategoryApi.getItemPropsByItemId(catItemId);
        let propEl = document.getElementById('properties');
        let propDiv = document.getElementById('propDiv');
        let itemNameDiv = document.getElementById('itemName');
        itemNameDiv.textContent = catItemName.toUpperCase();
        propDiv.innerHTML = null;
        for (let itemProp of itemProps) {
            propDiv.appendChild(this.addProperties(itemProp));
        }
        propEl.appendChild(itemNameDiv);
        propEl.appendChild(propDiv);
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
                }
                else {
                    panel.style.display = "block";
                }
            });
        }
    }
    craeteCatItems(catId) {
        let imgDiv = document.createElement('div');
        let categoryItems = CategoryApi.getCategoryItemsByCatId(catId);
        for (let catItems of categoryItems) {
            imgDiv.setAttribute("class", "flex-container");
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
            imgEl.setAttribute("class", "flex-elem");
            imgEl.setAttribute('title', catItems.categoryName);
            imgEl.setAttribute('id', catItems.catItemId);
            imgDiv.appendChild(imgEl);
            imgEl.addEventListener('click', this.onImgClicked.bind(null, this, catItems.catItemId, catItems.categoryName));
            imgEl.addEventListener('onmouseenter', this.onImgMouseEnter.bind(this, { id: catItems.catItemId }));
        }
        return imgDiv;
    }
    createCategories(category) {
        let categoryUi = document.createElement("div");
        let categoryBtn = document.createElement("button");
        categoryBtn.setAttribute('class', "accordion");
        categoryBtn.textContent = category.categoryName;
        let divEl = document.createElement('div');
        divEl.setAttribute('class', 'panel');
        let ulEl = document.createElement('ul');
        divEl.appendChild(this.craeteCatItems(category.categoryId));
        categoryUi.appendChild(categoryBtn);
        categoryUi.appendChild(divEl);
        return categoryUi;
    }
    create(parentToolBox) {
        var head = document.getElementsByTagName('HEAD')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './styles/toolbox_dd.css';
        head.appendChild(link);
        for (let category of this._categories) {
            parentToolBox.appendChild(this.createCategories(category));
            this.setAccordion();
        }
    }
}
//# sourceMappingURL=toolbox.js.map