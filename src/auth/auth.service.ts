import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> | null {
    const user = await this.usersService.getUserByEmail(email);
    const passwordIsValid = user.password === pass;
    if (passwordIsValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async verify(token: string): Promise<User> {
    const decoded: JwtPayload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const user = await this.usersService.getUserByEmail(decoded.email);
    return user;
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.userId,
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
