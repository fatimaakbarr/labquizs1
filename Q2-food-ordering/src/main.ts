import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // validates every request body using the DTO rules
  app.useGlobalPipes(new ValidationPipe());

  // serves the frontend (public folder) at http://localhost:3001
  app.useStaticAssets(join(__dirname, '..', 'public'));

  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
}
bootstrap();
