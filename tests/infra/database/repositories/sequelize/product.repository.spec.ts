import { Product } from "@/domain/entities/product";
import {
  Sequelize,
  SequelizeOptions,
} from 'sequelize-typescript';
import { SequelizeProductRepository } from "@/infra/database/repositories/sequelize/product.repository";
import { ProductModel } from "@/infra/database/repositories/sequelize/models/product.model";

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(async () => {
    _sequelize = new Sequelize({
      dialect: 'sqlite',
      host: ':memory:',
      logging: false,
      models: options.models,
    });
  });

  beforeEach(async () => await _sequelize.sync({ force: true }));

  afterAll(async () => await _sequelize.close());

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}


describe('Repository: SequelizeProductRepository', () => {
  let sut: SequelizeProductRepository;
  setupSequelize({ models: [ProductModel] });

  beforeEach(async () => {
    sut = new SequelizeProductRepository(ProductModel);
  });

  describe('create', () => {
    it('should to be able create a new product', async () => {
      const product = Product.create({ name: 'any_name', price: 10, stock: 10 });
      await sut.create(product);

      const [result] = await ProductModel.findAll();

      expect(result.toJSON()).toEqual(expect.objectContaining({
        name: 'any_name',
        price: 10,
        stock: 10,
      }));
    });
  });

  describe('getOne', () => {
    it('should to be able get a product by id', async () => {
      const product = Product.create({ name: 'any_name', price: 10, stock: 10 });
      await sut.create(product);
      const [searched] = await ProductModel.findAll();

      const result = await sut.getOne(searched.id);

      expect(result.toJSON()).toEqual(expect.objectContaining({
        id: searched.id,
        name: 'any_name',
        price: 10,
        stock: 10
      }));
    });

    it('should throw if product not found', async () => {
      await expect(sut.getOne('invalid_id')).rejects.toThrow('Product not found');
    });
  });

  describe('getMany', () => {
    it('should to be able get many products', async () => {
      await sut.create(Product.create({ name: 'any_name', price: 10, stock: 10 }));
      await sut.create(Product.create({ name: 'other_name', price: 20, stock: 20 }));

      const result = await sut.getMany({ perPage: 2, page: 1 });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: 'any_name', price: 10, stock: 10 }),
          expect.objectContaining({ name: 'other_name', price: 20, stock: 20 }),
        ],
        total: 2,
      });
    });
  });

  it('should be able get an empty list', async () => {
    const result = await sut.getMany({ perPage: 2, page: 1 });

    expect(result).toEqual({ data: [], total: 0 });
  });

  describe('save', () => {
    it('should to be able update a product', async () => {
      const instance = Product.create({ name: 'any_name', price: 10, stock: 10 });
      await sut.create(instance);
      const [searched] = await ProductModel.findAll();
      const product = await sut.getOne(searched.id);
      product.update({ name: 'new_name', price: 20, stock: 20 })

      await sut.save(product);

      const [result] = await ProductModel.findAll();

      expect(result.toJSON()).toEqual(expect.objectContaining({
        id: searched.id,
        name: 'new_name',
        price: 20,
        stock: 20,
      }));
    });
  });

  describe('delete', () => {
    it('should to be able delete a product', async () => {
      const instance = Product.create({ name: 'any_name', price: 10, stock: 10 });
      await sut.create(instance);
      const [searched] = await ProductModel.findAll();

      await sut.delete(searched.id);

      const result = await ProductModel.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('deleteAll', () => {
    it('should to be able delete all products', async () => {
      const instance1 = Product.create({ name: 'any_name', price: 10, stock: 10 });
      const instance2 = Product.create({ name: 'other_name', price: 15, stock: 15 });
      await sut.create(instance1);
      await sut.create(instance2);

      await sut.deleteAll();

      const result = await ProductModel.findAll();

      expect(result).toEqual([]);
    })
  })

  describe('search', () => {
    it('should to be able search products by name', async () => {
      const instance1 = Product.create({ name: 'any_name', price: 10, stock: 10 });
      const instance2 = Product.create({ name: 'other_name', price: 15, stock: 15 });
      await sut.create(instance1);
      await sut.create(instance2);

      const result = await sut.search({ perPage: 2, page: 1, name: 'any_name' });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: 'any_name', price: 10, stock: 10 }),
        ],
        total: 1,
      });
    })

    it('should to be able search products by id', async () => {
      const instance1 = Product.create({ name: 'any_name', price: 10, stock: 10 });
      const instance2 = Product.create({ name: 'other_name', price: 15, stock: 15 });
      await sut.create(instance1);
      await sut.create(instance2);
      const [searched] = await ProductModel.findAll();

      const result = await sut.search({ perPage: 2, page: 1, id: searched.id });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: 'any_name', price: 10, stock: 10 }),
        ],
        total: 1,
      });
    })
  })
});