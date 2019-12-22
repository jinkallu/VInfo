import { Category } from '../models/category';
import { CategoryItem } from '../models/categoryItem';
import { ItemProp } from '../models/itemProp';
import { Lookup } from '../models/lookup';
import * as MATH from 'mathjs'

export class CategoryApi {
     static categories: Category[] = [new Category(
          'c1',
          'Basic',
          1,
          'https://www.w3schools.com/howto/img_snow.jpg'),
     new Category(
          'c2',
          'Plot',
          2,
          'url'),
     new Category(
          'c3',
          'Graphing Calculators',
          2,
          'url'),
     new Category(
          'c4',
          'Simulation',
          2,
          'url'),
     new Category(
          'c5',
          'Generators',
          2,
          'url'),
     new Category(
          'c6',
          'Fitting',
          2,
          'url'),
     new Category(
          'c7',
          'IO',
          2,
          'url')
          ,
     new Category(
          'c8',
          'Nuclear',
          2,
          'url')
     ];
     static categoryItems: CategoryItem[] = [
          new CategoryItem('c1', 'i1', 'Array', '/static/images/array.png', 0, 1),
          new CategoryItem('c1', 'i2', 'Function1D', '/static/images/function1d.png', 1, 1),
          new CategoryItem('c2', 'i3', 'Graph', '/static/images/graph.png', 2, 0),
          new CategoryItem('c1', 'i4', 'Duplicate', '/static/images/duplicate.png', 1, 2),
          new CategoryItem('c2', 'i5', 'Histogram1D', '/static/images/histogram1d.png', 1, 0),
          new CategoryItem('c2', 'i6', 'Histogram2D', 'https://www.w3schools.com/howto/img_snow.jpg', 2, 0),
          new CategoryItem('c3', 'i7', 'Graphing Calculator 1D', '/static/images/graphingcalc.png', 0, 0),
          new CategoryItem('c4', 'i8', 'Simulate1D', '/static/images/simulate.png', 1, 0),
          new CategoryItem('c4', 'i9', 'Simulate2D', '/static/images/simulate2d.png', 2, 0),
          new CategoryItem('c4', 'i10', 'Motion', '/static/images/simulate2d.png', 0, 0),
          new CategoryItem('c4', 'i11', 'Gravity', '/static/images/gravity.png', 2, 0),
          new CategoryItem('c4', 'i12', 'Sphere', '/static/images/sphere.png', 2, 1),
          new CategoryItem('c4', 'i13', 'Position', '/static/images/position.png', 0, 1),
          new CategoryItem('c4', 'i14', 'Velocity', '/static/images/velocity.png', 0, 1),
          new CategoryItem('c5', 'i15', 'Fixed1D', '/static/images/fixed1d.png', 1, 1),
          new CategoryItem('c1', 'i16', 'Formula1D', '/static/images/formula1d.png', 0, 1),
          new CategoryItem('c5', 'i17', 'Random1D', '/static/images/random1d.png', 1, 1),
          new CategoryItem('c6', 'i18', 'Fitting1D', '/static/images/fitting1d.png', 2, 0),
          new CategoryItem('c1', 'i19', 'Function2D', '/static/images/function2d.png', 2, 1),
          new CategoryItem('c3', 'i20', 'Graphing Calculator 2D', '/static/images/graphingcalc.png', 0, 0),
          new CategoryItem('c7', 'i21', 'ReadFile', '/static/images/readfile.png', 0, 1),
          new CategoryItem('c8', 'i22', 'Nucleus', '/static/images/nucleus.png', 0, 1),
          new CategoryItem('c8', 'i23', 'Radioactivity', '/static/images/radioactive.png', 1, 1),
          new CategoryItem('c8', 'i24', 'Radioactive Lab', '/static/images/radioactivelab.png', 2, 1),
          new CategoryItem('c8', 'i25', 'Detector', '/static/images/detector.png', 1, 1),
          new CategoryItem('c8', 'i26', 'Simulate Decay', '/static/images/simulatedecay.png', 1, 0),
     ];

     static categoryProps: ItemProp[] = [
          new ItemProp('i1', 'p1', 'count', 'number', 'text', null, 1, true),
          new ItemProp('i1', 'p2', 'min', 'number', 'text', null, 2, true),
          new ItemProp('i1', 'p3', 'max', 'number', 'text', null, 3, true),
          new ItemProp('i1', 'p4', 'options', 'number', "select", null, 3, true),
          new ItemProp('i1', 'p5', 'fileinput', 'text', "file", null, 3, true),

          new ItemProp('i2', 'p6', 'function', 'formula', 'formula', null, 1, true),
          //new ItemProp('i7', 'p7', 'count', 'number', "10", 1, true),

          new ItemProp('i7', 'p8', 'min', 'number', 'text', null, 2, true),
          new ItemProp('i7', 'p9', 'max', 'number', 'text', null, 3, true),
          new ItemProp('i7', 'p10', 'Formula', 'formula', 'formula', null, 1, true),


          new ItemProp('i8', 'p11', 'Axis', 'number', 'text', null, 1, true),

          new ItemProp('i10', 'p12', 'Position_x', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p13', 'Position_y', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p14', 'Position_z', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p15', 'Velocity_x', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p16', 'Velocity_y', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p17', 'Velocity_z', 'number', 'text', null, 1, true),
          new ItemProp('i10', 'p18', 'duration', 'number', 'text', null, 1, true),

          //new ItemProp('i11', 'p19', 'Position_x', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p20', 'Position_y', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p21', 'Position_z', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p22', 'Velocity_x', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p23', 'Velocity_y', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p24', 'Velocity_z', 'number','text',null, 1, true),
          //new ItemProp('i11', 'p25', 'mass', 'number','text',null, 1, true),
          new ItemProp('i11', 'p26', 'duration', 'number', 'text', null, 1, true),

          new ItemProp('i12', 'p27', 'radius', 'number', 'text', null, 1, true),
          new ItemProp('i12', 'p28', 'mass', 'number', 'text', null, 1, true),
          new ItemProp('i12', 'p29', 'texture', 'string', 'text', null, 1, true),


          new ItemProp('i13', 'p30', 'Position_x', 'number', 'text', null, 1, true),
          new ItemProp('i13', 'p31', 'Position_y', 'number', 'text', null, 1, true),
          new ItemProp('i13', 'p32', 'Position_z', 'number', 'text', null, 1, true),

          new ItemProp('i14', 'p33', 'Velocity_x', 'number', 'text', null, 1, true),
          new ItemProp('i14', 'p34', 'Velocity_y', 'number', 'text', null, 1, true),
          new ItemProp('i14', 'p35', 'Velocity_z', 'number', 'text', null, 1, true),

          new ItemProp('i16', 'p36', 'formula', 'formula', 'formula', null, 1, true),
          new ItemProp('i16', 'p37', 'min', 'number', 'text', null, 1, true),
          new ItemProp('i16', 'p38', 'max', 'number', 'text', null, 1, true),
          //new ItemProp('i16', 'p50', 'formu', 'formula', 'formula', null, 1, true),



          new ItemProp('i17', 'p39', 'bins', 'number', 'text', null, 1, true),

          new ItemProp('i5', 'p40', 'bins', 'number', 'text', null, 1, true),

          new ItemProp('i18', 'p41', 'bins', 'number', 'text', null, 1, true),

          new ItemProp('i15', 'p42', 'bins', 'number', 'text', null, 1, true),
          new ItemProp('i19', 'p43', 'function', 'string', 'text', null, 1, true),
          
          new ItemProp('i20', 'p44', 'formula', 'formula', 'formula', null, 1, true),
          new ItemProp('i20', 'p45', 'x_min', 'number', 'text', null, 2, true),
          new ItemProp('i20', 'p46', 'x_max', 'number', 'text', null, 3, true),
          new ItemProp('i20', 'p47', 'y_min', 'number', 'text', null, 2, true),
          new ItemProp('i20', 'p48', 'y_max', 'number', 'text', null, 3, true),

          new ItemProp('i21', 'p49', 'fileinput', 'text', "file", null, 3, true),
          
          new ItemProp('i22', 'p50', 'Z', 'number', "text", null, 3, true),
          new ItemProp('i22', 'p51', 'A', 'number', "text", null, 3, true),
          new ItemProp('i22', 'p52', 'mass', 'number', "text", null, 3, true),
          new ItemProp('i22', 'p53', 'halflife', 'number', "text", null, 3, true),
          new ItemProp('i22', 'p54', 'alphas', 'string', "text", null, 3, true), // energy, %, energy, %


          new ItemProp('i25', 'p55', 'sigma', 'number', "text", null, 3, true),
          new ItemProp('i25', 'p56', 'radius', 'number', "text", null, 3, true),

          new ItemProp('i26', 'p57', 'bins', 'number', "text", null, 3, true),

     ]

     static lookupItems: Lookup[] = [
          new Lookup('p4', '1', 'option1'),
          new Lookup('p4', '2', 'option2'),
          new Lookup('p4', '3', 'option3'),
          new Lookup('p4', '4', 'option4'),
          new Lookup('p4', '5', 'option5'),
          new Lookup('p4', '6', 'option6')
     ];

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
                         itemProps.propSpec,
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

     static getLookupItems(propId: string) {

          let lookupItemArray = [];

          for (let lookupItem of this.lookupItems) {
               if (lookupItem.propId == propId) {
                    let itp = new Lookup(lookupItem.propId, lookupItem.lookupId, lookupItem.lookupVal

                    );
                    lookupItemArray.push(itp);
               }
          }
          return lookupItemArray;

     }

}