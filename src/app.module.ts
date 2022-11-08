import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import {ConfigModule} from "@nestjs/config";
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./env/.${process.env.NODE_ENV}.env`
    }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
    UserModule,
    ProductModule,
    AuthModule,
    CartModule,
    CategoryModule,
    OrderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
