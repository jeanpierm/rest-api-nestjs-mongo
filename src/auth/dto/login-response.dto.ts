import { ApiProperty } from '@nestjs/swagger';
import { AuthSchemaConfig } from '../config/auth.schema.config';

export class LoginResponse {
  @ApiProperty(AuthSchemaConfig.API_PROP_ACCESS_TOKEN)
  accessToken: string;
}
