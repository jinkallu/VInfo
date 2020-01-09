import { CategoryApi } from '../Api/categoryApi';
import {Category} from './category';

export class Categories{
    categoryApi:CategoryApi;
    categoriesDiv:HTMLDivElement;
    //category:Category[];

    constructor(){
        this.categoryApi = new CategoryApi();

        this.categoriesDiv = document.createElement("div");
        this.categoriesDiv.style.width = "100%";
        this.categoriesDiv.style.height = "100%";

        //this.category = [];
    }

    create(){
        this.createCategories();
        return this.categoriesDiv;
    }

     async createCategories(){
        let categories_data =  CategoryApi.getCategories();
        let flag_first:boolean = false;
        for (let category_data of await categories_data) {
            let category:Category = new Category(category_data); 
            this.categoriesDiv.appendChild(category.create());

            if(!flag_first){
                flag_first = true;
                category.toggleElements();
            }
        }
    }
}