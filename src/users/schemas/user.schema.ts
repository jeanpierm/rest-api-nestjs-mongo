import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { UserSchemaConfig } from '../config/user.schema.config';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty(UserSchemaConfig.API_PROP_ID)
  @Prop({ required: true })
  userId: string;

  @ApiProperty(UserSchemaConfig.API_PROP_EMAIL)
  @Prop({ required: true })
  email: string;

  @ApiProperty(UserSchemaConfig.API_PROP_PASSWORD)
  @Prop({ required: true })
  password: string;

  @ApiProperty(UserSchemaConfig.API_PROP_AGE)
  @Prop()
  age: number;

  @ApiProperty(UserSchemaConfig.API_PROP_FAVORITE_FOODS)
  @Prop([String])
  favoriteFoods: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
