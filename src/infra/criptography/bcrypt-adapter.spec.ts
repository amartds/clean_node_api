import bcrypt from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';
describe('BcryptAdapter', () => {
  it('should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter(12);
    const spyHash = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value_valid');
    expect(spyHash).toHaveBeenCalled();
    expect(spyHash).toHaveBeenCalledWith('any_value_valid', 12);
  });
});
