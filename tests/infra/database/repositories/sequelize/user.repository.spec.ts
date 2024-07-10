import { setupSequelize } from "./helpers/setup-sequelize";
import { User } from "../../../../../src/domain/entities/user";
import { UserModel } from "../../../../../src/infra/database/repositories/sequelize/models/user.model";
import { SequelizeUserRepository } from "../../../../../src/infra/database/repositories/sequelize/user.repository";

describe('Repository: SequelizeUserRepository', () => {
  setupSequelize({ models: [UserModel] });
  let sut: SequelizeUserRepository;
  let user: User;

  beforeAll(() => {
    user = User.create({ name: 'any_name', email: 'any_email', password: 'any_password' });
  });

  beforeEach(async () => {
    sut = new SequelizeUserRepository(UserModel);
  });

  describe('create', () => {
    it('should to be able create a new user', async () => {
      await sut.create(user);

      const [result] = await UserModel.findAll();

      expect(result.toJSON()).toEqual(expect.objectContaining({
        name: user.toJSON().name,
        email: user.toJSON().email,
        password: user.toJSON().password,
      }));
    });
  });

  describe('checkByEmail', () => {
    it('should return true if email exists', async () => {
      await UserModel.create(user.toJSON());

      const result = await sut.checkByEmail(user.toJSON().email);

      expect(result).toBe(true);
    });

    it('should return false if email not exists', async () => {
      const result = await sut.checkByEmail(user.toJSON().email);

      expect(result).toBe(false);
    });
  });

  describe('getByEmail', () => {
    it('should return user if email exists', async () => {
      await UserModel.create(user.toJSON());

      const result = await sut.getByEmail(user.toJSON().email);

      expect(result).toEqual(expect.objectContaining({
        name: user.toJSON().name,
        email: user.toJSON().email,
        password: user.toJSON().password,
      }));
    });

    it('should return null if email not exists', async () => {
      const result = await sut.getByEmail(user.toJSON().email);

      expect(result).toBeNull();
    });
  });
});