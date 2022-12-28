import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import * as fs from "fs";

async function bootstrap() {
  const PORT = process.env.PORT || 5001
  let httpsOptions;

  if (process.env.NODE_ENV === 'prod') {
    httpsOptions = {
      key: fs.readFileSync('./certs/private.pem'),
      cert: fs.readFileSync('./certs/public.pem'),
    };

  }

  const app = await NestFactory.create(AppModule, {httpsOptions})
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}
bootstrap();
