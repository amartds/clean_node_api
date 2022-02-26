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
    addAccountRepository: AddAccountRepository,
  ) {
    this.encrypter = encrypter;
    this.addAccountRepository = addAccountRepository;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
