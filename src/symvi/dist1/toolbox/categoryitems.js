import { CategoryApi } from '../Api/categoryApi';
import { CategoryItem } from './categoryitem';
export class CategoryItems {
    constructor(_cat_id) {
        this.cat_id = _cat_id;
        this.cat_items_div = document.createElement('div');
        this.cat_items_div.setAttribute('class', 'panel');
        this.cat_items_div.setAttribute("class", "flex-container");
        this.cat_items_div.style.width = "100%";
        this.cat_items_div.style.justifyContent = "space-between";
        this.cat_items_div.style.display = 'none';
    }
    create() {
        let category_tems_data = CategoryApi.getCategoryItemsByCatId(this.cat_id);
        for (let cat_item_data of category_tems_data) {
            let cat_item = new CategoryItem(cat_item_data);
            this.cat_items_div.appendChild(cat_item.create());
        }
        return this.cat_items_div;
    }
    toggleView() {
        if (this.cat_items_div.style.display === 'none') {
            this.cat_items_div.style.display = 'block';
        }
        else {
            this.cat_items_div.style.display = 'none';
        }
    }
}
//# sourceMappingURL=categoryitems.js.map