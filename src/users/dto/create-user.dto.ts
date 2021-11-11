import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserSchemaConfig } from '../config/user.schema.config';

export class CreateUserDto {
  @ApiProperty(UserSchemaConfig.API_PROP_EMAIL)
  @IsEmail()
  email: string;

  @ApiProperty(UserSchemaConfig.API_PROP_PASSWORD)
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty(UserSchemaConfig.API_PROP_AGE)
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty(UserSchemaConfig.API_PROP_FAVORITE_FOODS)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteFoods: string[];
}
