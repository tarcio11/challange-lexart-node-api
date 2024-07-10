import { JwtHandler } from '../../../../src/infra/gateways/jwt-handler';
import jwt from 'jsonwebtoken';

describe('JwtHandler', () => {
  let sut: JwtHandler;

  beforeEach(async () => {
    sut = new JwtHandler();
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should call sign with correct params', () => {
    const signSpy = jest.spyOn(jwt, 'sign');

    sut.generate('any_id');

    expect(signSpy).toHaveBeenCalledWith('any_id', 'secret');
  });

  it('should return a valid id', async () => {
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => 'any_hash');

    const hash = await sut.generate('any_id');

    expect(hash).toBe('any_hash');
  });
});