import { Encripter } from './add-account/db-add-account-protocols';
import { DbAddAccount } from './add-account/db-add-account'

const makeEncriptStub = (): Encripter => {
  class EncryptStub implements Encripter {
    async encrypt(password: string): Promise<string> {
      return new Promise(resolve => resolve('valid_password'));
    }
  }
  return new EncryptStub();
};

type typeStub = {
  sut: DbAddAccount
  encrypter: Encripter
}

const makeSut = (): typeStub => {
  const encrypter = makeEncriptStub();
  const sut = new DbAddAccount(encrypter);
  return {
    sut,
    encrypter
  }
}
describe('DBaddAccount useCase', () => {
  it('should call the encrypt with correct password', async () => {
    const { sut, encrypter } = makeSut();
    const addAccountModel = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'valid_password'
    };
    const spy = jest.spyOn(encrypter, 'encrypt');
    await sut.add(addAccountModel);
    expect(spy).toHaveBeenCalledWith('valid_password');
  });
  it('should throw one exception if the encrypt throws', async () => {
    const { sut, encrypter } = makeSut();
    jest.spyOn(encrypter, 'encrypt')
      .mockResolvedValue(new Promise((resolve, reject) => reject(new Error())));
    const addAccountModel = {
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'valid_password'
    };
    const promise = sut.add(addAccountModel);
    await expect(promise).rejects.toThrow();
  });
});
