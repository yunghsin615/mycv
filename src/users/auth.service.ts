import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    const userArr = await this.usersService.find(email);
    if (userArr.length) {
      throw new BadRequestException('This email has already signed up');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create(email, result);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('wrong user email');
    }
    const [salt, hash] = user.password.split('.');

    const pwdHash = (await scrypt(password, salt, 32)) as Buffer;
    if (pwdHash.toString('hex') !== hash) {
      throw new BadRequestException('wrong user password');
    }
    return user;
  }
}
