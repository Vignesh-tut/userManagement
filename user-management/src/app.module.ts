import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { LookupsModule } from './modules/lookups/lookups.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from './common/config';
import { LoggerMiddleware } from './middleware/Logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(new Config().USERDB()),
    UsersModule,
    LookupsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({ path: "users", method: RequestMethod.ALL })
  }

}
