import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger OpenAPI config
  const config = new DocumentBuilder()
    .setTitle(SwaggerConfig.TITLE)
    .setDescription(SwaggerConfig.DESCRIPTION)
    .setVersion(SwaggerConfig.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SwaggerConfig.PATH, app, document);

  // validation pipe
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
