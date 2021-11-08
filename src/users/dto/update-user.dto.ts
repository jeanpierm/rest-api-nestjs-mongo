import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
// export class UpdateUserDto {
//   @ApiProperty()
//   @IsEmail()
//   email: string;

//   @ApiProperty()
//   @IsNotEmpty()
//   password: string;

//   @ApiProperty({
//     description: 'The age of user',
//     minimum: 1,
//     required: false,
//   })
//   @IsInt()
//   age: number;

//   @ApiProperty({
//     required: false,
//   })
//   @IsArray()
//   @IsString({ each: true })
//   favoriteFoods: string[];
// }
