import { INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { randomUUID } from 'crypto';
import * as request from 'supertest';
import { User } from '../src/users/schemas/user.schema';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const mockUsers = [{ userId: 'abc', email: 'jeanpi3rm@gmail.com' }];

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(async (dto) => {
      const passHash = await hash(dto.password, 10);
      return { ...dto, userId: randomUUID(), password: passHash };
    }),
    exists: jest.fn(),
    find: jest.fn(),
  };
  mockUsersRepository.find.mockImplementationOnce(() => ({
    lean: jest.fn().mockReturnValue(mockUsers),
  }));
  mockUsersRepository.exists.mockImplementationOnce(() => ({
    lean: jest.fn().mockReturnValue(null),
  }));

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getModelToken(User.name))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('[GET] /users', async () => {
    await request(app.getHttpServer()).get('/users').expect(200).expect(mockUsers);
  });

  it('[POST] /users', async () => {
    const createUserDto = {
      name: 'Jeanpier',
      surname: 'Mendoza',
      email: 'jeanpiermendoza@outlook.com',
      password: '1234',
    };
    await request(app.getHttpServer())
      .post('/users')
      .send(createUserDto)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          userId: expect.any(String),
          name: 'Jeanpier',
          surname: 'Mendoza',
          email: 'jeanpiermendoza@outlook.com',
          password: expect.any(String),
        });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
