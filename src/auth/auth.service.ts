import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cache } from 'cache-manager';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUniq({ username });
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.userId,
        roles: ['admin1'],
      }),
    };
  }

  async register(signUpDto: SignUpDto) {
    // TODO: create token to confirm email. Pending...

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(signUpDto.password, salt);
    return this.userService.create({
      username: signUpDto.username,
      password: hash,
    });
  }
}
