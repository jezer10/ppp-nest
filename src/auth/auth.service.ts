import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    console.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      message: 'Logueado Correctamente',
      info: { user, roles: [{ role_id: 1, name: 'Supervisor' }] },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
