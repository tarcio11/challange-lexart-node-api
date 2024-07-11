import { MockProxy } from 'jest-mock-extended';
import { JwtHandler } from '../../../../src/infra/gateways/jwt-handler';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('any_hash'),
  verify: () => ({ id: 'any_id' })
}));

describe('JwtHandler', () => {
  let sut: JwtHandler;


  beforeEach(async () => {
    sut = new JwtHandler();
  });

  describe('generate', () => {
    it('should call sign with correct params', () => {
      const signSpy = jest.spyOn(jwt, 'sign');

      sut.generate('any_id');

      expect(signSpy).toHaveBeenCalledWith('any_id', 'secret', {
        expiresIn: '30min'
      });
    });

    it('should return a valid id', async () => {
      const hash = await sut.generate('any_id');

      expect(hash).toBe('any_hash');
    });
  })

  describe('validate', () => {
    it('should call verify with correct params', () => {
      const verifySpy = jest.spyOn(jwt, 'verify');

      sut.validate({ token: 'any_token' });

      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    })

    it('should return a valid id', async () => {
      const id = await sut.validate({ token: 'any_token' });

      expect(id).toBe('any_id');
    })

    it('should throw if verify throws', async () => {
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => { throw new Error('token_error') });

      await expect(sut.validate({ token: 'any_token' })).rejects.toThrow(new Error('token_error'));
    })
  })
});