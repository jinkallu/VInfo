import { CategoryApi } from './Api/categoryApi';
export class ToolBox {
    constructor() {
        this.onImgClicked = (event, id, name) => {
            this.createProperties(id, name);
        };
        this.onImgMouseEnter = (event, catItem) => {
            let divEl = document.getElementById("divFullItem");
            if (divEl === null) {
                divEl = document.createElement('div');
                divEl.setAttribute('id', 'divFullItem');
            }
            divEl.innerHTML = null;
            divEl.setAttribute('class', 'modal');
            let imgEl = document.getElementById(catItem.catItemId);
            divEl.style.display = 'flex';
            divEl.style.flexDirection = 'column';
            divEl.style.textAlign = "center";
            let imgModalEl = document.createElement('img');
            imgModalEl.setAttribute('src', imgEl.getAttribute('src'));
            imgModalEl.style.width = "90%";
            imgModalEl.style.height = "70%";
            let lblEl = document.createElement('label');
            lblEl.textContent = catItem.categoryName;
            let designArea = document.getElementById('designArea');
            divEl.style.top = designArea.style.top;
            divEl.style.left = designArea.style.left;
            divEl.appendChild(imgModalEl);
            divEl.appendChild(lblEl);
            designArea.appendChild(divEl);
            divEl.style.display = 'block';
        };
        this.onImgMouseLeave = (event, catItem) => {
            let divEl = document.getElementById("divFullItem");
            if (divEl !== null) {
                divEl.style.display = 'none';
            }
        };
        this._categories = CategoryApi.getCategories();
    }
    addProperties(itemProp) {
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
        for (let catItem of categoryItems) {
            imgDiv.setAttribute("class", "flex-container");
            imgDiv.style.width = "100%";
            imgDiv.style.justifyContent = "space-between";
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
            imgEl.setAttribute("class", "flex-elem");
            imgEl.setAttribute('title', catItem.categoryName);
            imgEl.setAttribute('id', catItem.catItemId);
            imgDiv.appendChild(imgEl);
            imgEl.addEventListener('click', this.onImgClicked.bind(null, this, catItem.catItemId, catItem.categoryName));
            imgEl.addEventListener('mouseenter', this.onImgMouseEnter.bind(null, this, catItem));
            imgEl.addEventListener('mouseleave', this.onImgMouseLeave.bind(null, this, catItem));
        }
        return imgDiv;
    }
    createCategories(category) {
        let categoryUi = document.createElement("div");
        categoryUi.style.width = "90%";
        let categoryBtn = document.createElement("div");
        categoryBtn.setAttribute('class', "accordion");
        categoryBtn.textContent = category.categoryName.toUpperCase();
        categoryBtn.style.margin = '2px';
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
        }
        this.setAccordion();
    }
}
//# sourceMappingURL=toolbox.js.map