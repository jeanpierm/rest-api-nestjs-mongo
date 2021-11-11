import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponse } from './dto/delete-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userModel.findOne({ userId }).exec();
    if (!user) {
      throw new NotFoundException(`No existe el usuario ${userId}`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`No existe el usuario ${email}`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password, age, favoriteFoods } = user;
    const newUser = new this.userModel({
      userId: uuidv4(),
      email,
      password,
      age,
      favoriteFoods,
    });
    return newUser.save();
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({ userId }, userUpdates, {
      new: true,
    });
  }

  async deleteUser(userId: string): Promise<DeleteUserResponse> {
    return this.userModel.deleteOne({ userId });
  }
}
