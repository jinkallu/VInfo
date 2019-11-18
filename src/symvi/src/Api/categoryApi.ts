import { Category } from '../models/category.js';
import { CategoryItem } from '../models/categoryItem.js';
import {ItemProp} from '../models/itemProp.js';
export class CategoryApi {
     static categories = [new Category(
          'c1',
          'Category1',
          1,
          'url'),
     new Category(
          'c2',
          'Category3',
          2,
          'url'),
     new Category(
          'c3',
          'Category3',
          2,
          'url')];
     static categoryItems = [
          new CategoryItem('c1', 'i1', 'item1', 'url'),
          new CategoryItem('c1', 'i2', 'item2', 'url'),
          new CategoryItem('c1', 'i3', 'item3', 'url'),
          new CategoryItem('c1', 'i4', 'item4', 'url'),
          new CategoryItem('c1', 'i5', 'item5', 'url'),
          new CategoryItem('c1', 'i6', 'item6', 'url'),
          new CategoryItem('c1', 'i7', 'item7', 'url'),
          new CategoryItem('c3', 'i8', 'item1', 'url'),
     ];

     static categoryProps=[
          new ItemProp('i1','p1','count','number',"10",1,true),
          new ItemProp('i1','p2','min','number',"0",2,true),
          new ItemProp('i1','p3','max','number',"10",3,true),
          new ItemProp('i1','p4','prop4','string',"10",4,false),
          new ItemProp('i1','p5','prop5','string',"10",5,true),
          new ItemProp('i2','p6','propi2p6','number',null,1,true),
          new ItemProp('i2','p7','propi2p7','number',"10",2,true),
          new ItemProp('i2','p8','propi2p8','number',"10",3,true),
          new ItemProp('i3','p9','propi3p9','number',"10",4,false),
          new ItemProp('i3','p10','propi3p10','number',"10",2,true),
     ]


     static getCategories() {
          return [...this.categories];
     }

     static getCategoryItemsByCatId(categoryId: string) {
          return [...this.categoryItems.filter(i => {
               return i.categoryId === categoryId;
          })];
     }

     static getItemPropsByItemId(catItemId: string){
          return [...this.categoryProps.filter(i=>{
               return i.catItemId===catItemId;
          })]
     }

}