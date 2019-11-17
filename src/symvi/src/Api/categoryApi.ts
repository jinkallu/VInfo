import { Category } from '../models/category';
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
          'url')]

    static getCategories() {
          return [...this.categories];
     }

}