import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { comparePassword, encrypt } from './utils/password.util';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, name: string) {
    const userArr = await this.usersService.find(email);
    if (userArr.length) {
      throw new BadRequestException('This email has already signed up');
    }

    const encryptedPwd = await encrypt(password);

    const user = await this.usersService.create(email, encryptedPwd, name);
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) {
      throw new NotFoundException('wrong user email');
    }
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('wrong user password');
    }
    return user;
  }
}
