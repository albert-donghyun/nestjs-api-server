import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { ISignup } from './interface';
import { Role } from './enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(args: ISignup) {
    const user = await this.userService.getUserByEmail(args.email);
    if (user) {
      throw new BadRequestException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newUser = await this.userService.addUser({
      ...args,
      password: hashedPassword,
    });
    return this.signJWT(newUser.id, Role.USER);
  }

  async signin(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new NotFoundException('회원가입한 유저가 아닙니다.');
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new BadRequestException('잘못된 비밀번호입니다.');
    }

    return this.signJWT(user.id, Role.USER);
  }

  private signJWT(userId: number, role: Role) {
    const accessToken = this.jwtService.sign(
      { _id: +userId, _role: role },
      { expiresIn: '1d' },
    );

    const refreshToken = this.jwtService.sign(
      { _id: +userId, _role: role, _refresh: true },
      { expiresIn: '3d' },
    );

    return { accessToken, refreshToken };
  }
}
