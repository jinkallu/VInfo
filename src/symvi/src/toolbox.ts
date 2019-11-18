import { Category } from './models/category.js';
import { CategoryApi } from './Api/categoryApi.js';
import { CategoryItem } from './models/categoryItem.js';
// import * as  $ from './js/jquery.js';
// import  './styles/toolbox_dd.css';
export class ToolBox {


    private _categories: Category[];

    constructor() {
        this._categories = CategoryApi.getCategories();
    }

    onImgClicked = (event: MouseEvent) => {
        console.log(event);
    }
    onImgMouseEnter = (event: MouseEvent) => {
        console.log(event);
    }
    setAccordion() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                console.log("clicked");
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                console.log(panel);
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
        // let imgDivWrapper = document.createElement('div');
        for (let catItems of categoryItems) {
            imgDiv.setAttribute("class", "flex-container");
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
            imgEl.setAttribute("class", "flex-elem");
            imgEl.setAttribute('title', catItems.categoryName);
            imgEl.setAttribute('id', catItems.catItemId);
            imgDiv.appendChild(imgEl);
            imgEl.addEventListener('click', this.onImgClicked.bind(this, catItems.catItemId))
            imgEl.addEventListener('onmouseenter', this.onImgMouseEnter.bind(this, catItems.catItemId))
        }
                return imgDiv;
    }

    createCategories(category: Category) {
        let categoryUi = document.createElement("div");
        let categoryBtn = document.createElement("button");
        categoryBtn.setAttribute('class', "accordion");
        categoryBtn.textContent = category.categoryName;
        let divEl = document.createElement('div');
        divEl.setAttribute('class', 'panel');
        let ulEl = document.createElement('ul');
        divEl.appendChild(this.craeteCatItems(category.categoryId));
        // divEl.appendChild(imgDiv);
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
            this.setAccordion();
        }
    }
}


