import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

export type UserModelProps = {
  id?: string
  name: string
  email: string
  password: string
};

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModelProps> {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, field: 'user_id' })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare name: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare email: string;

  @Column({ allowNull: false, type: DataType.STRING(255) })
  declare password: string;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'created_at', defaultValue: DataType.NOW })
  declare createdAt: Date;

  @Column({ allowNull: false, type: DataType.DATE(3), field: 'updated_at', defaultValue: DataType.NOW })
  declare updatedAt: Date;
}