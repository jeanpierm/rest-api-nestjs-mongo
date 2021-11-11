import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersConfig } from 'src/config/users.config';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponse } from './dto/delete-response';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags(UsersConfig.TAG)
@Controller(UsersConfig.PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation(UsersConfig.API_OP_GET_ALL)
  @ApiOkResponse(UsersConfig.API_RES_GET_ALL)
  async getAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // ruta protegida con JWT
  @Get(UsersConfig.ID_PATH)
  @ApiOperation(UsersConfig.API_OP_GET_BY_ID)
  @ApiOkResponse(UsersConfig.API_RES_GET_BY_ID)
  @UseGuards(JwtAuthGuard)
  async getById(@Param(UsersConfig.ID_PARAM) userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @ApiOperation(UsersConfig.API_OP_CREATE)
  @ApiCreatedResponse(UsersConfig.API_RES_CREATE)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Patch(UsersConfig.ID_PATH)
  @ApiOperation(UsersConfig.API_OP_UPDATE_BY_ID)
  @ApiOkResponse(UsersConfig.API_RES_UPDATE_BY_ID)
  async updateById(
    @Param(UsersConfig.ID_PARAM) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(UsersConfig.ID_PATH)
  @ApiOperation(UsersConfig.API_OP_DELETE_BY_ID)
  @ApiOkResponse(UsersConfig.API_RES_DELETE_BY_ID)
  async deleteById(@Param(UsersConfig.ID_PARAM) userId: string): Promise<DeleteUserResponse> {
    return this.usersService.deleteUser(userId);
  }
}
