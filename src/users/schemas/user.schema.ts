import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UsersConfig } from 'src/config/users.config';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty(UsersConfig.API_PROP_ID)
  @Prop()
  userId: string;

  @ApiProperty(UsersConfig.API_PROP_EMAIL)
  @Prop({ required: true })
  email: string;

  @ApiProperty(UsersConfig.API_PROP_PASSWORD)
  @Prop({ required: true })
  password: string;

  @ApiProperty(UsersConfig.API_PROP_AGE)
  @Prop()
  age: number;

  @ApiProperty(UsersConfig.API_PROP_FAVORITE_FOODS)
  @Prop([String])
  favoriteFoods: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
