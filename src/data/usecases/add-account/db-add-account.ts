import { AccountModel } from './db-add-account-protocols';
import {
  AddAccount,
  AddAccountModel
} from '../../../domain/usecases/add-account';
import { Encripter } from '../../protocols/encripter';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encripter;
  constructor(encrypter: Encripter) {
    this.encrypter = encrypter;
  }

  async add(account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password);
    return new Promise(resolve => resolve(null));
  }
}
