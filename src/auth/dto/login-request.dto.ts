import { ApiProperty } from '@nestjs/swagger';

export class LoginRequest {
  @ApiProperty({
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({
    example: '1234',
    description: 'The password of the user',
  })
  password: string;
}
