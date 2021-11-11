import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthConfig } from 'src/auth/config/auth.config';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginResponse } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(AuthConfig.TAG)
@Controller(AuthConfig.PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation(AuthConfig.API_OP_LOGIN)
  @ApiOkResponse(AuthConfig.API_RES_LOGIN)
  @Post(AuthConfig.LOGIN_PATH)
  async login(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
