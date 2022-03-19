import bcrypt from 'bcrypt';
import { Encripter } from '../../data/protocols/encripter';
export class BcryptAdapter implements Encripter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
}
