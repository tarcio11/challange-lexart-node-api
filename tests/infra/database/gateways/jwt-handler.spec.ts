import { MockProxy } from 'jest-mock-extended';
import { JwtHandler } from '../../../../src/infra/gateways/jwt-handler';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('any_hash'),
  verify: jest.fn().mockReturnValue('any_id')
}));

describe('JwtHandler', () => {
  let sut: JwtHandler;


  beforeEach(async () => {
    sut = new JwtHandler();
  });

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
});