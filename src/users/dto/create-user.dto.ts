import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UsersConfig } from 'src/config/users.config';

export class CreateUserDto {
  @ApiProperty(UsersConfig.API_PROP_EMAIL)
  @IsEmail()
  email: string;

  @ApiProperty(UsersConfig.API_PROP_PASSWORD)
  @IsNotEmpty()
  password: string;

  @ApiProperty(UsersConfig.API_PROP_AGE)
  @IsOptional()
  @IsInt()
  age: number;

  @ApiProperty(UsersConfig.API_PROP_FAVORITE_FOODS)
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteFoods: string[];
}
