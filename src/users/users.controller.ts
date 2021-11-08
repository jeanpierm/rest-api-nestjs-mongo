import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ description: 'Get all users.' })
  @ApiOkResponse({
    description: 'The users were successfully obtained.',
    type: [User],
  })
  async findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // ruta protegida con JWT
  @Get(':userId')
  @ApiOperation({ description: 'Get a user by userId.' })
  @ApiOkResponse({
    description: 'The user was successfully obtained.',
    type: User,
  })
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('userId') userId: string): Promise<User> {
    try {
      return this.usersService.getUserById(userId);
    } catch (err) {
      console.log(err);
    }
  }

  @Post()
  @ApiOperation({ description: 'Create a user.' })
  @ApiCreatedResponse({
    description: 'The user has been successfully created.',
    type: User,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch(':userId')
  @ApiOperation({ description: 'Update a user by userId.' })
  @ApiOkResponse({
    description: 'The user was successfully updated.',
    type: User,
  })
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(':userId')
  @ApiOperation({ description: 'Delete a user by userId.' })
  @ApiOkResponse({
    description: 'The user was successfully deleted.',
    type: User,
  })
  async delete(@Param('userId') userId: string): Promise<User> {
    return this.usersService.deleteUser(userId);
  }
}
