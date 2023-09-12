import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'schemas/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { Jwtmiddleware } from './middlewares/jwtAuth';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports:[
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest-rest-api'),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AppController,UserController],
  providers: [AppService,UserService,JwtService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(Jwtmiddleware)
      .forRoutes({path:'users',method:RequestMethod.GET});
  }
}
