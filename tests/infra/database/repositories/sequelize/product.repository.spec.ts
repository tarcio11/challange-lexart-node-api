import { Product } from "@/domain/entities/product";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  SequelizeOptions,
  Table,
} from 'sequelize-typescript';

export type ProductModelProps = {
  id?: string
  name: string
  price: number
  stock: number
};

@Table({ tableName: 'products' })
export class ProductModel extends Model<ProductModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, field: 'product_id' })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.DECIMAL(10, 2) })
  declare price: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  declare stock: number;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'created_at', defaultValue: DataType.NOW })
  declare createdAt: Date;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'updated_at', defaultValue: DataType.NOW })
  declare updatedAt: Date;
}


export class SequelizeProductRepository {
  constructor(private categoryModel: typeof ProductModel) {}

  async create (product: Product): Promise<void> {
    const data = product.toJSON()
    await this.categoryModel.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
    });
  }

  async getOne (id: string): Promise<Product> {
    const product = await this.categoryModel.findByPk(id);
    if (!product) throw new Error('Product not found');
    return Product.create(product.toJSON());
  }

  async getMany (options: { perPage: number, page: number }): Promise<{ data: Product[], total: number }> {
    const { perPage, page } = options;
    const { count, rows } = await this.categoryModel.findAndCountAll({
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    return {
      data: rows.map(row => new Product(row.toJSON())),
      total: count,
    };
  }

  async save (product: Product): Promise<void> {
    const data = product.toJSON();
    await this.categoryModel.update({
      name: data.name,
      price: data.price,
      stock: data.stock,
    }, { where: { id: data.id } });
  }

  async delete (id: string): Promise<void> {
    await this.categoryModel.destroy({ where: { id } });
  }

  async deleteAll (): Promise<void> {
    await this.categoryModel.destroy({ truncate: true });
  }

  async search (options: { perPage: number, page: number, id?: string, name?: string }): Promise<{ data: Product[], total: number }> {
    const { perPage, page, id, name } = options;
    const where = { ...(id && { id }), ...(name && { name }) };
    const { count, rows } = await this.categoryModel.findAndCountAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    return {
      data: rows.map(row => new Product(row.toJSON())),
      total: count,
    };

  }
}

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
  })
});