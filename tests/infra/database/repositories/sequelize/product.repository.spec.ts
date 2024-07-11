import { setupSequelize } from "./helpers/setup-sequelize";
import { Product } from "../../../../../src/domain/entities/product";
import { ProductModel } from "../../../../../src/infra/database/repositories/sequelize/models/product.model";
import { ProductFakeBuilder } from "../../../../domain/fakes/product-fake.builder";
import { SequelizeProductRepository } from "../../../../../src/infra/database/repositories/sequelize/product.repository";

describe('Repository: SequelizeProductRepository', () => {
  setupSequelize({ models: [ProductModel] });
  let sut: SequelizeProductRepository;
  let product: Product;

  beforeAll(() => {
    product = ProductFakeBuilder.aProduct().build();
  });

  beforeEach(async () => {
    sut = new SequelizeProductRepository(ProductModel);
  });

  describe('create', () => {
    it('should to be able create a new product', async () => {
      await sut.create(product);

      const [result] = await ProductModel.findAll();

      expect(result.toJSON()).toEqual(expect.objectContaining({
        name: product.toJSON().name,
        price: product.toJSON().price,
        stock: product.toJSON().stock,
      }));
    });
  });

  describe('getOne', () => {
    it('should to be able get a product by id', async () => {
      await sut.create(product);
      const [searched] = await ProductModel.findAll();

      const result = await sut.getOne(searched.id);

      expect(result.toJSON()).toEqual(expect.objectContaining({
        id: searched.id,
        name: product.toJSON().name,
        price: product.toJSON().price,
        stock: product.toJSON().stock,
      }));
    });

    it('should throw if product not found', async () => {
      await expect(sut.getOne('invalid_id')).rejects.toThrow('Product not found');
    });
  });

  describe('getMany', () => {
    it('should to be able get many products', async () => {
      const products = ProductFakeBuilder.theProducts(2).build();
      await sut.create(products[0]);
      await sut.create(products[1]);

      const result = await sut.getMany({ perPage: 2, page: 1 });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: products[0].toJSON().name, price: products[0].toJSON().price, stock: products[0].toJSON().stock }),
          expect.objectContaining({ name: products[1].toJSON().name, price: products[1].toJSON().price, stock: products[1].toJSON().stock }),
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
      await sut.create(ProductFakeBuilder.aProduct().build());
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
      await sut.create(product);
      const [searched] = await ProductModel.findAll();

      await sut.delete(searched.id);

      const result = await ProductModel.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('deleteAll', () => {
    it('should to be able delete all products', async () => {
      const products = ProductFakeBuilder.theProducts(2).build();
      await sut.create(products[0]);
      await sut.create(products[1]);

      await sut.deleteAll();

      const result = await ProductModel.findAll();

      expect(result).toEqual([]);
    })
  })

  describe('search', () => {
    it('should to be able search products by name', async () => {
      const products = ProductFakeBuilder.theProducts(2).build();
      await sut.create(products[0]);
      await sut.create(products[1]);

      const result = await sut.search({ perPage: 2, page: 1, name: products[0].toJSON().name });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: products[0].toJSON().name, price: products[0].toJSON().price, stock: products[0].toJSON().stock }),
        ],
        total: 1,
      });
    })

    it('should to be able search products by id', async () => {
      const products = ProductFakeBuilder.theProducts(2).build();
      await sut.create(products[0]);
      await sut.create(products[1]);
      const [searched] = await ProductModel.findAll();

      const result = await sut.search({ perPage: 2, page: 1, id: searched.id });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: products[0].toJSON().name, price: products[0].toJSON().price, stock: products[0].toJSON().stock }),
        ],
        total: 1,
      });
    })

    it('should to be able search products by external', async () => {
      const products = ProductFakeBuilder.theProducts(2).withIsExternal(true).build();
      await sut.create(products[0]);
      await sut.create(products[1]);

      const result = await sut.search({ perPage: 2, page: 1, external: true });

      expect(result).toEqual({
        data: [
          expect.objectContaining({ name: products[0].toJSON().name, price: products[0].toJSON().price, stock: products[0].toJSON().stock, isExternal: true }),
          expect.objectContaining({ name: products[1].toJSON().name, price: products[1].toJSON().price, stock: products[1].toJSON().stock, isExternal: true }),
        ],
        total: 2,
      });
    })
  })

  describe('loadData', () => {
    it('should to be able load data', async () => {
      await sut.loadData();

      const result = await ProductModel.findAll();

      expect(result).toHaveLength(50);
    });
  });
});