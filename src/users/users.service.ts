import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUsers(): Promise<User[]> {
    return this.usersRepository.find({});
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.usersRepository.findOne({ userId });
    if (!user) {
      throw new NotFoundException(`No existe el usuario ${userId}`);
    }
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ email });
    if (!user) {
      throw new NotFoundException(`No existe el usuario ${email}`);
    }
    return user;
  }

  async createUser(user: CreateUserDto): Promise<User> {
    const { email, password, age } = user;
    return this.usersRepository.create({
      userId: uuidv4(),
      email,
      password,
      age,
      favoriteFoods: [],
    });
  }

  async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
    return this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
  }

  async deleteUser(userId: string): Promise<User> {
    return this.usersRepository.remove({ userId });
  }
}
