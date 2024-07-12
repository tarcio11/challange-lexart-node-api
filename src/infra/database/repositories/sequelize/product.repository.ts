import { ProductModel } from "./models/product.model";
import { Product } from "../../../../domain/entities/product";
import { ProductRepository } from "../../../../domain/contracts/repositories/product";
import { ProductFakeBuilder } from "../../../../../tests/domain/fakes/product-fake.builder";
import { NotFoundError } from "../../../../domain/errors/not-found-error";
import { Op, where } from "sequelize";

export class SequelizeProductRepository implements ProductRepository {
  constructor(private productModel: typeof ProductModel) {}

  async loadData (): Promise<void> {
    const products = ProductFakeBuilder.theProducts(50).build();
    await this.productModel.bulkCreate(products.map(product => product.toJSON()));
  }

  async create (product: Product): Promise<void> {
    const data = product.toJSON()
    await this.productModel.create({
      name: data.name,
      price: data.price,
      stock: data.stock,
      isExternal: data.isExternal,
    });
  }

  async getOne (id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundError('Product not found');
    return Product.create(product.toJSON());
  }

  async getMany (options: { perPage: number, page: number }): Promise<{ data: Product[], total: number }> {
    const { perPage, page } = options;
    const { count, rows } = await this.productModel.findAndCountAll({
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
    await this.productModel.update({
      name: data.name,
      price: data.price,
      stock: data.stock,
    }, { where: { id: data.id } });
  }

  async delete (id: string): Promise<void> {
    await this.productModel.destroy({ where: { id } });
  }

  async deleteAll (): Promise<void> {
    await this.productModel.destroy({ truncate: true });
  }

  async search (options: {
    perPage: number,
    page: number,
    id?: string,
    name?: string,
    external?: boolean,
    withDeleted?: boolean
   }): Promise<{ data: Product[], total: number }> {
    const { perPage, page, id, name } = options;
    const where: any = {
      ...(id && { id }),
      ...(name && { name: { [Op.like]: `%${name}%` } }),
      ...(options.external && { isExternal: true }),
      ...(options.withDeleted && { deletedAt: { [Op.ne]: null } }),

    };
    const { count, rows } = await this.productModel.findAndCountAll({
      where,
      limit: perPage,
      offset: (page - 1) * perPage,
      paranoid: !options.withDeleted,
    });

    return {
      data: rows.map(row => new Product(row.toJSON())),
      total: count,
    };
  }
}