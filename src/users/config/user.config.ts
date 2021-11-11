import { ApiResponseOptions } from '@nestjs/swagger';
import { OperationObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { User } from 'src/users/schemas/user.schema';
import { DeleteUserResponse } from '../dto/delete-response.dto';

export class UserConfig {
  static readonly TAG: string = 'users';
  static readonly PATH: string = 'api/users';
  static readonly ID_PATH: string = ':userId';
  static readonly ID_PARAM: string = 'userId';
  static readonly API_OP_GET_ALL: Partial<OperationObject> = { description: 'Get all users.' };
  static readonly API_RES_GET_ALL: ApiResponseOptions = {
    description: 'The users were successfully obtained.',
    type: [User],
  };
  static readonly API_OP_GET_BY_ID: Partial<OperationObject> = {
    description: 'Get a user by userId.',
  };
  static readonly API_RES_GET_BY_ID: ApiResponseOptions = {
    description: 'The user was successfully obtained.',
    type: User,
  };
  static readonly API_OP_CREATE: Partial<OperationObject> = { description: 'Create a user.' };
  static readonly API_RES_CREATE: ApiResponseOptions = {
    description: 'The user has been successfully created.',
    type: User,
  };
  static readonly API_OP_UPDATE_BY_ID: Partial<OperationObject> = {
    description: 'Update a user by userId.',
  };
  static readonly API_RES_UPDATE_BY_ID: ApiResponseOptions = {
    description: 'The user was successfully updated.',
    type: User,
  };
  static readonly API_OP_DELETE_BY_ID: Partial<OperationObject> = {
    description: 'Delete a user by userId.',
  };
  static readonly API_RES_DELETE_BY_ID: ApiResponseOptions = {
    description: 'The user was successfully deleted.',
    type: DeleteUserResponse,
  };
}
