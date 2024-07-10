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

  it('should a be able create a new product', async () => {
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