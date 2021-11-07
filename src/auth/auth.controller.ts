import { Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User): Promise<{ accessToken: string }> {
    return this.authService.login(user);
  }
}
