import { Category } from './models/category.js';
import { CategoryApi } from './Api/categoryApi.js';
// import * as  $ from './js/jquery.js';
// import  './styles/toolbox_dd.css';
export class ToolBox {



    private _categories: Category[];

    constructor() {
        this._categories = CategoryApi.getCategories();
    }

    create(parentToolBox: HTMLDivElement) {

        var head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element 
        var link = document.createElement('link');

        // set the attributes for link element  
        link.rel = 'stylesheet';

        link.type = 'text/css';

        link.href = './styles/toolbox_dd.css';

        // Append link element to HTML head 
        head.appendChild(link);

        //   for (let category in this._categories){
        //   let categoryUi=document.createElement("div");
        //   categoryUi.setAttribute('class',"wrapper-dropdown-2");

        //   categoryUi.setAttribute('id','dd');

        //   let uiEl=document.createElement('ul');
        //   uiEl.setAttribute('class','dropdown');
        //   let liEl=document.createElement('li');
        //   liEl.textContent="one";
        //   uiEl.appendChild(liEl);
        //   categoryUi.textContent="test";
        //   categoryUi.appendChild(uiEl);
        //   parentToolBox.appendChild(categoryUi);








        //   }

        for (let category of this._categories) {
            let categoryUi = document.createElement("div");
            let categoryBtn = document.createElement("button");
            categoryBtn.setAttribute('class', "accordion");
            console.log(category);
            categoryBtn.textContent = category.categoryName;
            //   categoryUi.textContent="test";


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
                imgEl.setAttribute('title',catItems.categoryName);
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
                    } else {
                        panel.style.display = "block";
                    }
                });






            }






        }





    }

}
