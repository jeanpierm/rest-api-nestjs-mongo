import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Jeanpier',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'Mendoza',
    description: 'The surname of the user',
  })
  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @ApiProperty({
    example: '1234',
    description: 'The password of the user',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 22,
    description: 'The age of the user',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  favoriteFoods?: string[];
}
