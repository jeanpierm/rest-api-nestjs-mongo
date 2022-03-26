import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserResponse {
  @ApiProperty({
    example: 1,
    description: 'Number of removed users',
  })
  deletedCount: number;
}
