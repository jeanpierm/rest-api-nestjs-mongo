import { ApiResponseOptions } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { LoginResponse } from 'src/auth/dto/login-response.dto';

export class AuthConfig {
  static readonly TAG: string = 'auth';
  static readonly PATH: string = 'api/auth';
  static readonly LOGIN_PATH: string = 'login';
  static readonly API_OP_LOGIN: Partial<OperationObject> = { description: 'Login user' };
  static readonly API_RES_LOGIN: ApiResponseOptions = {
    description: 'The users logged in successfully.',
    type: LoginResponse,
  };
}
