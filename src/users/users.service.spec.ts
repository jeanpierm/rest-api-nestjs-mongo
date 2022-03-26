import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(async (dto) => {
      const passHash = await hash(dto.password, 10);
      return { ...dto, userId: randomUUID(), password: passHash };
    }),
    exists: jest.fn(),
  };

  mockUsersRepository.exists.mockImplementationOnce(() => ({
    lean: jest.fn().mockReturnValue(null),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User.name),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debe guardar un usuario y retornarlo', async () => {
    console.log(process.env.NODE_ENV);
    const dto: CreateUserDto = {
      name: 'jeanpier',
      surname: 'mendoza',
      email: 'jeanpi3rm@gmail.com',
      password: '1234',
    };
    const created = await service.create(dto);
    expect(created).toEqual({
      userId: expect.any(String),
      name: 'jeanpier',
      surname: 'mendoza',
      email: 'jeanpi3rm@gmail.com',
      password: expect.any(String),
    });
  });
});
