export interface Encripter {
  encrypt(value: string): Promise<string>;
}
