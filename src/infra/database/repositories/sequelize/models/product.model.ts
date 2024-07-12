import {
  Column,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type ProductModelProps = {
  id?: string
  name: string
  price: number
  stock: number
  isExternal?: boolean
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

  @Column({ allowNull: false, type: DataType.BOOLEAN, field: 'is_external', defaultValue: false })
  declare isExternal: boolean;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'created_at', defaultValue: DataType.NOW })
  declare createdAt: Date;

  @DeletedAt
  declare deletedAt: Date;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'updated_at', defaultValue: DataType.NOW })
  declare updatedAt: Date;
}