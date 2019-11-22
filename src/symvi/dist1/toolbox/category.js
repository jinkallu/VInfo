import { CategoryItems } from './categoryitems';
export class Category {
    constructor(_category_data) {
        this.toggleElements = () => {
            this.categoty_items.toggleView();
        };
        this.category_data = _category_data;
        this.categoryDiv = document.createElement("div");
        this.categoryDiv.style.width = "90%";
        this.categoty_items = new CategoryItems(this.category_data.categoryId);
        this.categoryBtn = document.createElement("div");
        this.categoryBtn.setAttribute('class', "accordion");
        this.setCategoryName(this.category_data.categoryName);
        this.categoryBtn.style.margin = '2px';
        this.categoryDiv.appendChild(this.categoryBtn);
        this.categoryBtn.addEventListener("click", this.toggleElements);
    }
    setCategoryName(name) {
        this.categoryBtn.textContent = name.toUpperCase();
    }
    create() {
        this.categoryDiv.appendChild(this.categoty_items.create());
        return this.categoryDiv;
    }
}
//# sourceMappingURL=category.js.map