import { ApiPropertyOptions } from '@nestjs/swagger';

export class UserSchemaConfig {
  static readonly API_PROP_ID: ApiPropertyOptions = {
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the user',
  };
  static readonly API_PROP_EMAIL: ApiPropertyOptions = {
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  };
  static readonly API_PROP_PASSWORD: ApiPropertyOptions = {
    example: '123',
    description: 'The password of the user',
  };
  static readonly API_PROP_AGE: ApiPropertyOptions = {
    example: 22,
    description: 'The age of the user',
    required: false,
  };
  static readonly API_PROP_FAVORITE_FOODS: ApiPropertyOptions = {
    example: ['banana', 'oatmeal'],
    description: "User's favorite foods",
    required: false,
  };
  static readonly API_PROP_DELETED_COUNT: ApiPropertyOptions = {
    example: 1,
    description: 'Number of removed users',
  };
}
