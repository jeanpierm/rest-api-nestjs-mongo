import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplYW5waTNybUBnbWFpbC5jb20iLCJzdWIiOiJhMTgxODg5OC0wYzE5LTRkYWYtYTBhMS0yMWMzZWE1Mzk5YzUiLCJpYXQiOjE2MzY2MDYwNTIsImV4cCI6MTYzNjYwOTY1Mn0.D5tE_JE0a-4C6BUjzdXLsY5KaRPmM-c2JUAOZU7-Bt0',
    description: 'The json web token for the user logged',
  })
  accessToken: string;
}
