import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({
    example: '8104f19c-a2d8-40f7-9a0b-12f4c6a4b80a',
    description: 'The ID of the user',
  })
  @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID(),
  })
  userId: string;

  @ApiProperty({
    example: 'Jeanpier',
    description: 'The name of the user',
  })
  @Prop({ required: true, trim: true, lowercase: true })
  name: string;

  @ApiProperty({
    example: 'Mendoza',
    description: 'The surname of the user',
  })
  @Prop({ required: true, trim: true, lowercase: true })
  surname: string;

  @ApiProperty({
    example: 'jeanpi3rm@gmail.com',
    description: 'The email of the user',
  })
  @Prop({
    required: true,
    index: { unique: true },
    lowercase: true,
  })
  email: string;

  @ApiProperty({
    example: '123',
    description: 'The password of the user',
  })
  @Prop({ required: true })
  password: string;

  @ApiProperty({
    example: ['banana', 'oatmeal'],
    description: "User's favorite foods",
    required: false,
  })
  @Prop([String])
  favoriteFoods?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
