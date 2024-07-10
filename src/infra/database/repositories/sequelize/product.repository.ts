import { Product } from "@/domain/entities/product";
import { ProductModel } from "./models/product.model";

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