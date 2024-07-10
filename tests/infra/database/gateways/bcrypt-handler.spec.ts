import bcrypt from 'bcrypt';
import { BcryptHandler } from '../../../../src/infra/gateways/bcrypt-handler';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hash';
  },
  async compare(): Promise<boolean> {
    return true;
  }
}));

describe('Hash', () => {
  it('should call hash with correct values', async () => {
    const sut = new BcryptHandler();
    const spyCompare = jest.spyOn(bcrypt, 'hash');
    await sut.hash('any_value');
    expect(spyCompare).toHaveBeenCalledWith('any_value', 10);
  });

  it('should return a valid hash on hash success', async () => {
    const sut = new BcryptHandler();
    const hash = await sut.hash('any_value');
    expect(hash).toBe('hash');
  });

  it('should throw if hash throws', async () => {
    const sut = new BcryptHandler();
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.hash('any_value');
    await expect(promise).rejects.toThrow();
  });

  describe('Compare', () => {
    it('should call compare with correct values', async () => {
      const sut = new BcryptHandler();
      const spyCompare = jest.spyOn(bcrypt, 'compare');
      await sut.compare('any_value', 'any_hash');
      expect(spyCompare).toHaveBeenCalledWith('any_value', 'any_hash');
    });

    it('should return true when compare succeeds', async () => {
      const sut = new BcryptHandler();
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(true);
    });

    it('should return false when compare fails', async () => {
      const sut = new BcryptHandler();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      const isValid = await sut.compare('any_value', 'any_hash');
      expect(isValid).toBe(false);
    });

    it('should throw if compare throws', async () => {
      const sut = new BcryptHandler();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });
      const promise = sut.compare('any_value', 'any_hash');
      await expect(promise).rejects.toThrow();
    });
  });
});