import { faker, Faker } from '@faker-js/faker';
import { Product } from '../../../src/domain/entities/product';

type PropOrFactory<T> = T | ((index: number) => T);

export class ProductFakeBuilder<TBuild = any> {
  private _id: PropOrFactory<string> = (_index) => this.faker.string.uuid();
  private _name: PropOrFactory<string> = (_index) => this.faker.commerce.productName();
  private _price: PropOrFactory<number> = (_index) => this.faker.number.float({ min: 0, max: 1000 });
  private _stock: PropOrFactory<number> = (_index) => this.faker.number.int({ min: 0, max: 1000 });
  private _isExternal: PropOrFactory<boolean> = (_index) => false;
  private _created_at: PropOrFactory<Date> = (_index) => this.faker.date.recent();
  private _updated_at: PropOrFactory<Date> = (_index) => this.faker.date.recent();

  private countObjs;

  static aProduct() {
    return new ProductFakeBuilder<Product>();
  }

  static theProducts(countObjs: number) {
    return new ProductFakeBuilder<Product[]>(countObjs);
  }

  private faker: Faker = faker;

  private constructor(countObjs: number = 1) {
    this.countObjs = countObjs;
    this.faker = faker;
  }

  withProductId(valueOrFactory: PropOrFactory<string>) {
    this._id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withPrice(valueOrFactory: PropOrFactory<number>) {
    this._price = valueOrFactory;
    return this;
  }

  withStock(valueOrFactory: PropOrFactory<number>) {
    this._stock = valueOrFactory;
    return this;
  }

  withIsExternal(valueOrFactory: PropOrFactory<boolean>) {
    this._isExternal = valueOrFactory;
    return this;
  }

  withCreatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }


  withUpdatedAt(valueOrFactory: PropOrFactory<Date>) {
    this._updated_at = valueOrFactory;
    return this;
  }

  build(): TBuild {
    const products = new Array(this.countObjs)
      .fill(undefined)
      .map((_, index) => {
        const product = new Product({
          name: this.callFactory(this._name, index),
          price: this.callFactory(this._price, index),
          stock: this.callFactory(this._stock, index),
          ...(this._id && { id: this.callFactory(this._id, index) }),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
          ...(this._updated_at && {
            updated_at: this.callFactory(this._updated_at, index),
          }),
          ...(this._isExternal && { isExternal: this.callFactory(this._isExternal, index) }),
        });
        return product;
      });
    return this.countObjs === 1 ? (products[0] as any) : products;
  }

  get id() {
    return this.getValue('id');
  }

  get name() {
    return this.getValue('name');
  }

  get price() {
    return this.getValue('price');
  }

  get stock() {
    return this.getValue('stock');
  }

  get isExternal() {
    return this.getValue('isExternal');
  }

  get createdAt() {
    return this.getValue('created_at');
  }

  get updatedAt() {
    return this.getValue('updated_at');
  }

  private getValue(prop: any) {
    const optional = ['id', 'created_at', 'updated_at', 'isExternal'];
    const privateProp = `_${prop}` as keyof this;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`,
      );
    }
    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropOrFactory<any>, index: number) {
    return typeof factoryOrValue === 'function'
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
