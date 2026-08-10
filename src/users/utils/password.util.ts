import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

export async function encrypt(password: string): Promise<string> {
  const salt = randomBytes(8).toString('hex');

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  const result = salt + '.' + hash.toString('hex');

  return result;
}

export async function comparePassword(
  password: string,
  storedPwd: string,
): Promise<boolean> {
  const [salt, hash] = storedPwd.split('.');

  const pwdHash = (await scrypt(password, salt, 32)) as Buffer;

  return pwdHash.toString('hex') === hash;
}
