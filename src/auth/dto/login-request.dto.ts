import { ApiProperty } from '@nestjs/swagger';
import { AuthSchemaConfig } from '../config/auth.schema.config';

export class LoginRequest {
  @ApiProperty(AuthSchemaConfig.API_PROP_EMAIL)
  email: string;

  @ApiProperty(AuthSchemaConfig.API_PROP_PASSWORD)
  password: string;
}
