import { CategoryApi } from './Api/categoryApi.js';
export class ToolBox {
    constructor() {
        this._categories = CategoryApi.getCategories();
    }
    create(parentToolBox) {
        var head = document.getElementsByTagName('HEAD')[0];
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = './styles/toolbox_dd.css';
        head.appendChild(link);
        for (let category of this._categories) {
            let categoryUi = document.createElement("div");
            let categoryBtn = document.createElement("button");
            categoryBtn.setAttribute('class', "accordion");
            console.log(category);
            categoryBtn.textContent = category.categoryName;
            let divEl = document.createElement('div');
            divEl.setAttribute('class', 'panel');
            let ulEl = document.createElement('ul');
            let categoryItems = CategoryApi.getCategoryItemsByCatId(category.categoryId);
            let imgDivWrapper = document.createElement('div');
            let imgDiv = document.createElement('div');
            for (let catItems of categoryItems) {
                imgDiv.setAttribute("class", "flex-container");
                let imgEl = document.createElement('img');
                imgEl.setAttribute('src', 'https://www.w3schools.com/howto/img_snow.jpg');
                imgEl.setAttribute("class", "flex-elem");
                imgEl.setAttribute('title', catItems.categoryName);
                imgDiv.appendChild(imgEl);
            }
            divEl.appendChild(imgDiv);
            categoryUi.appendChild(categoryBtn);
            categoryUi.appendChild(divEl);
            parentToolBox.appendChild(categoryUi);
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
                    }
                    else {
                        panel.style.display = "block";
                    }
                });
            }
        }
    }
}
//# sourceMappingURL=toolbox.js.map