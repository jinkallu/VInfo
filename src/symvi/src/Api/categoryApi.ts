import { Category } from '../models/category';
import { CategoryItem } from '../models/categoryItem';
import { ItemProp } from '../models/itemProp';
export class CategoryApi {
     static categories: Category[] = [new Category(
          'c1',
          'Category1',
          1,
          'url'),
     new Category(
          'c2',
          'Category2',
          2,
          'url'),
     new Category(
          'c3',
          'Category3',
          2,
          'url')];
     static categoryItems: CategoryItem[] = [
          new CategoryItem('c1', 'i1', 'Array', 'url', 0, 1),
          new CategoryItem('c1', 'i2', 'Formula', 'url', 1, 1),
          new CategoryItem('c1', 'i3', 'Graph', 'url', 2, 0),
          new CategoryItem('c1', 'i4', 'Duplicate', 'url', 1, 2),
          new CategoryItem('c1', 'i5', 'item5', 'url', 1, 2),
          new CategoryItem('c1', 'i6', 'item6', 'url', 2, 3),
          new CategoryItem('c1', 'i7', 'item7', 'url', 3, 2),
          new CategoryItem('c2', 'i8', 'item8', 'url', 3, 3),
          new CategoryItem('c3', 'i9', 'item9', 'url', 2, 0),
     ];

     static categoryProps: ItemProp[] = [
          new ItemProp('i1', 'p1', 'count', 'number', "10", 1, true),
          new ItemProp('i1', 'p2', 'min', 'number', "0", 2, true),
          new ItemProp('i1', 'p3', 'max', 'number', "10", 3, true),
          new ItemProp('i1', 'p4', 'prop4', 'string', "10", 4, false),
          new ItemProp('i1', 'p5', 'prop5', 'date', "10", 5, true),
          new ItemProp('i2', 'p6', 'propi2p6', 'number', null, 1, true),
          new ItemProp('i2', 'p7', 'propi2p7', 'number', "10", 2, true),
          new ItemProp('i2', 'p8', 'propi2p8', 'number', "10", 3, true),
          new ItemProp('i3', 'p9', 'propi3p9', 'number', "10", 4, false),
          new ItemProp('i3', 'p10', 'propi3p10', 'number', "10", 2, true),
     ]


     static getCategories() {
          return [...this.categories];
     }

     static getCategoryItemsByCatId(categoryId: string): CategoryItem[] {
          let catitemArr = [];
          for (let retCatItem of this.categoryItems) {
               if (retCatItem.categoryId == categoryId) {
                    catitemArr.push(retCatItem);

               }

          }

          return catitemArr;
     }

     static getCategoryItemByItemId(catItemId: string): CategoryItem {
          // return {...this.categoryItems.find(i => {
          //      return i.catItemId === catItemId;
          // })};


          for (let catItem of this.categoryItems) {
               if (catItem.catItemId == catItemId) {
                    return catItem;
               }
          }
     }

     static getItemPropsByItemId(catItemId: string): ItemProp[] {
          let itemPropArray = [];

          for (let itemProps of this.categoryProps) {
               if (itemProps.catItemId == catItemId) {
                    let itp = new ItemProp(
                         itemProps.catItemId,
                         itemProps.propId,
                         itemProps.propName,
                         itemProps.propType,
                         itemProps.propDefVal,
                         itemProps.propOrder,
                         itemProps.propReqd,
                    );
                    itemPropArray.push(itp);
               }
          }
          return itemPropArray;

          //      console.log("called getitempropbuitemid");
          //     let  itemPropArr=[...this.categoryProps];
          //     console.log(itemPropArr);
          //      let itemPorps=[...itemPropArr.filter(i=>{
          //           return i.catItemId===catItemId;
          //      })];
          //      // console.log(itemPorps);
          //      console.log("call ended getitempropbuitemid");

          //      return itemPorps;
     }

}