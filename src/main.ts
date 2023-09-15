import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFastifyApplication,FastifyAdapter } from "@nestjs/platform-fastify";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000,() => {
    console.log("server listning on post : 3000..");
  });
  const second_app = await NestFactory.create<NestFastifyApplication>(AppModule,new FastifyAdapter());
  await second_app.listen(3333,()=> {
    console.log("server listning on port : 3333..");
  })
}
bootstrap();
