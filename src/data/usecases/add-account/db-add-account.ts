import {
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  AccountModel,
} from './db-add-account-protocols';
import { Encripter } from '../../protocols/encripter';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encripter;
  private readonly addAccountRepository: AddAccountRepository;
  constructor(
    encrypter: Encripter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const passwordEncript = await this.encrypter.encrypt(accountData.password);
    return this.addAccountRepository.add(
      Object.assign({}, accountData, { password: passwordEncript }),
    );
  }
}
