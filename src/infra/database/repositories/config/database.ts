import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../sequelize/models/product.model";
import { env } from "../../../../main/config/env";

const models = [
  ProductModel
]

export const sequelize = new Sequelize(env.database.url, {
  dialect: 'postgres',
  host: env.database.url,
  logging: false,
  models,
  ssl: true,
});