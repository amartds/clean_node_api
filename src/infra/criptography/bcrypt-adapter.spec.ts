import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve('any_hash_valid'));
  },
}));

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter;
  beforeEach(async () => {
    sut = new BcryptAdapter(12);
  });
  describe('encrypt', () => {
    it('should call bcrypt with correct values', async () => {
      const spyHash = jest.spyOn(bcrypt, 'hash');
      await sut.encrypt('any_value_valid');
      expect(spyHash).toHaveBeenCalled();
      expect(spyHash).toHaveBeenCalledWith('any_value_valid', 12);
    });

    it('should return the correct hash using bcrypt', async () => {
      const response = await sut.encrypt('any_value_valid');
      expect(response).toBe('any_hash_valid');
    });
  });
});
