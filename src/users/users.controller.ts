import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserConfig } from 'src/users/config/user.config';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserResponse } from './dto/delete-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags(UserConfig.TAG)
@Controller(UserConfig.PATH)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation(UserConfig.API_OP_GET_ALL)
  @ApiOkResponse(UserConfig.API_RES_GET_ALL)
  async getAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  // ruta protegida con JWT
  @Get(UserConfig.ID_PATH)
  @ApiOperation(UserConfig.API_OP_GET_BY_ID)
  @ApiOkResponse(UserConfig.API_RES_GET_BY_ID)
  @UseGuards(JwtAuthGuard)
  async getById(@Param(UserConfig.ID_PARAM) userId: string): Promise<User> {
    return this.usersService.getUserById(userId);
  }

  @Post()
  @ApiOperation(UserConfig.API_OP_CREATE)
  @ApiCreatedResponse(UserConfig.API_RES_CREATE)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Patch(UserConfig.ID_PATH)
  @ApiOperation(UserConfig.API_OP_UPDATE_BY_ID)
  @ApiOkResponse(UserConfig.API_RES_UPDATE_BY_ID)
  async updateById(
    @Param(UserConfig.ID_PARAM) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Delete(UserConfig.ID_PATH)
  @ApiOperation(UserConfig.API_OP_DELETE_BY_ID)
  @ApiOkResponse(UserConfig.API_RES_DELETE_BY_ID)
  async deleteById(@Param(UserConfig.ID_PARAM) userId: string): Promise<DeleteUserResponse> {
    return this.usersService.deleteUser(userId);
  }
}
