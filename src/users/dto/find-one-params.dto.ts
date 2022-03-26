import { IsString } from 'class-validator';

export class FindOneParams {
  @IsString()
  userId: string;
}
