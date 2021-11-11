import { ApiProperty } from '@nestjs/swagger';
import { UserSchemaConfig } from '../config/user.schema.config';

export class DeleteUserResponse {
  @ApiProperty(UserSchemaConfig.API_PROP_DELETED_COUNT)
  deletedCount: number;
}
