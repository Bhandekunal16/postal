/* eslint-disable @typescript-eslint/no-var-requires */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const Logger = require('robotic.js/interface/Logger') as any;
const logger = new Logger();
require('dotenv').config();

logger.log(process.env.LOCALHOST);
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.LOCALHOST);
}
bootstrap();
