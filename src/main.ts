import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger OpenAPI config
  const config = new DocumentBuilder()
    .setTitle('NestJS RESTful API example')
    .setDescription('The NestJS API description')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
