import { Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthConfig } from 'src/auth/config/auth.config';
import { User } from 'src/users/schemas/user.schema';
import { AuthService } from './auth.service';
import { CurrentUser } from './current-user.decorator';
import { LoginRequest } from './dto/login-request.dto';
import { LoginResponse } from './dto/login-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags(AuthConfig.TAG)
@Controller(AuthConfig.PATH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @ApiOperation(AuthConfig.API_OP_LOGIN)
  @ApiOkResponse(AuthConfig.API_RES_LOGIN)
  @ApiBody({
    description: 'Credentials of user',
    type: LoginRequest,
  })
  @Post(AuthConfig.LOGIN_PATH)
  async login(@CurrentUser() user: User): Promise<LoginResponse> {
    return this.authService.login(user);
  }
}
