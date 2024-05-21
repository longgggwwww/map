import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUniq({ username, isActive: true });
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
    const roles = user.roles.map((role) => role.code);
    const permissions = Array.from(
      user.roles.reduce((set, role) => {
        role.permissions.map((perm) => set.add(perm.code));
        return set;
      }, new Set()),
    );
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
        roles,
        permissions,
      }),
      refreshToken: this.jwtService.sign(
        { sub: user.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '30d',
        },
      ),
      user,
    };
  }

  async register(signUpDto: SignUpDto) {
    // TODO: create token to confirm email. Pending...

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(signUpDto.password, salt);
    const user = await this.userService.create({
      username: signUpDto.username,
      password: hash,
      isActive: true,
      personal: {
        create: {},
      },
    });
    return this.login(user);
  }

  async refreshToken(token: string) {
    // Check storage
    const payload = await this.jwtService.verify(token, {
      secret: this.configService.get('REFRESH_TOKEN_SECRET'),
    });

    const user = await this.userService.findUniq({
      id: payload.sub,
    });
    if (!user) {
      return new UnauthorizedException();
    }

    // New token
    const roles = user.roles.map((role) => role.code);
    const permissions = Array.from(
      user.roles.reduce((set, role) => {
        role.permissions.map((perm) => set.add(perm.code));
        return set;
      }, new Set()),
    );
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id,
        roles,
        permissions,
      }),
      refreshToken: this.jwtService.sign(
        { sub: user.id },
        {
          secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          expiresIn: '30d',
        },
      ),
    };
  }
}
