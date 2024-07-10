import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../sequelize/models/product.model";

const models = [
  ProductModel
]

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: ':memory:',
  logging: false,
  database: ':memory:',
  models,
});