import { Category } from '../models/category';
import { CategoryItem } from '../models/categoryItem';
import { ItemProp } from '../models/itemProp';
export class CategoryApi {
    static getCategories() {
        return [...this.categories];
    }
    static getCategoryItemsByCatId(categoryId) {
        let catitemArr = [];
        for (let retCatItem of this.categoryItems) {
            if (retCatItem.categoryId == categoryId) {
                catitemArr.push(retCatItem);
            }
        }
        return catitemArr;
    }
    static getCategoryItemByItemId(catItemId) {
        for (let catItem of this.categoryItems) {
            if (catItem.catItemId == catItemId) {
                return catItem;
            }
        }
    }
    static getItemPropsByItemId(catItemId) {
        let itemPropArray = [];
        for (let itemProps of this.categoryProps) {
            if (itemProps.catItemId == catItemId) {
                let itp = new ItemProp(itemProps.catItemId, itemProps.propId, itemProps.propName, itemProps.propType, itemProps.propDefVal, itemProps.propOrder, itemProps.propReqd);
                itemPropArray.push(itp);
            }
        }
        return itemPropArray;
    }
}
CategoryApi.categories = [new Category('c1', 'Basic', 1, 'https://www.w3schools.com/howto/img_snow.jpg'),
    new Category('c2', 'Plot', 2, 'url'),
    new Category('c3', 'Graphing Calculators', 2, 'url'),
    new Category('c4', 'Simulation', 2, 'url')
];
CategoryApi.categoryItems = [
    new CategoryItem('c1', 'i1', 'Array', '/static/images/array.png', 0, 1),
    new CategoryItem('c1', 'i2', 'Formula', '/static/images/formula.png', 1, 1),
    new CategoryItem('c2', 'i3', 'Graph', '/static/images/graph.png', 2, 0),
    new CategoryItem('c1', 'i4', 'Duplicate', '/static/images/duplicate.png', 1, 2),
    new CategoryItem('c2', 'i5', 'Hist1', 'https://www.w3schools.com/howto/img_snow.jpg', 1, 0),
    new CategoryItem('c2', 'i6', 'Hist2', 'https://www.w3schools.com/howto/img_snow.jpg', 2, 0),
    new CategoryItem('c3', 'i7', 'Graphing Calculator', '/static/images/graphingcalc.png', 0, 0),
    new CategoryItem('c4', 'i8', 'Simulate1D', '/static/images/simulate.png', 1, 0),
    new CategoryItem('c4', 'i9', 'Simulate2D', '/static/images/simulate2d.png', 2, 0),
    new CategoryItem('c4', 'i10', 'Motion', '/static/images/simulate2d.png', 0, 0),
    new CategoryItem('c4', 'i11', 'Gravity', '/static/images/gravity.png', 2, 0),
    new CategoryItem('c4', 'i12', 'Sphere', '/static/images/sphere.png', 2, 1),
    new CategoryItem('c4', 'i13', 'Position', '/static/images/position.png', 0, 1),
    new CategoryItem('c4', 'i14', 'Velocity', '/static/images/velocity.png', 0, 1)
];
CategoryApi.categoryProps = [
    new ItemProp('i1', 'p1', 'count', 'number', null, 1, true),
    new ItemProp('i1', 'p2', 'min', 'number', null, 2, true),
    new ItemProp('i1', 'p3', 'max', 'number', null, 3, true),
    new ItemProp('i2', 'p6', 'Formula', 'string', null, 1, true),
    new ItemProp('i7', 'p8', 'min', 'number', null, 2, true),
    new ItemProp('i7', 'p9', 'max', 'number', null, 3, true),
    new ItemProp('i7', 'p10', 'Formula', 'string', null, 1, true),
    new ItemProp('i8', 'p11', 'Axis', 'number', null, 1, true),
    new ItemProp('i10', 'p12', 'Position_x', 'number', null, 1, true),
    new ItemProp('i10', 'p13', 'Position_y', 'number', null, 1, true),
    new ItemProp('i10', 'p14', 'Position_z', 'number', null, 1, true),
    new ItemProp('i10', 'p15', 'Velocity_x', 'number', null, 1, true),
    new ItemProp('i10', 'p16', 'Velocity_y', 'number', null, 1, true),
    new ItemProp('i10', 'p17', 'Velocity_z', 'number', null, 1, true),
    new ItemProp('i10', 'p18', 'duration', 'number', null, 1, true),
    new ItemProp('i11', 'p26', 'duration', 'number', null, 1, true),
    new ItemProp('i12', 'p27', 'radius', 'number', null, 1, true),
    new ItemProp('i12', 'p28', 'mass', 'number', null, 1, true),
    new ItemProp('i12', 'p29', 'texture', 'string', null, 1, true),
    new ItemProp('i13', 'p30', 'Position_x', 'number', null, 1, true),
    new ItemProp('i13', 'p31', 'Position_y', 'number', null, 1, true),
    new ItemProp('i13', 'p32', 'Position_z', 'number', null, 1, true),
    new ItemProp('i14', 'p33', 'Velocity_x', 'number', null, 1, true),
    new ItemProp('i14', 'p34', 'Velocity_y', 'number', null, 1, true),
    new ItemProp('i14', 'p35', 'Velocity_z', 'number', null, 1, true)
];
//# sourceMappingURL=categoryApi.js.map