import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { StorageModule } from './storage/storage.module';
import { ArticleModule } from './article/article.module';
import { NotifyModule } from './notify/notify.module';
import { ConfigModule } from "@nestjs/config";
import { getMongoDB } from "../config/getMongoDB";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./.env.local', './.env']
    }),
    MongooseModule.forRoot(getMongoDB().URI, {dbName: getMongoDB().DB}),
    UserModule,
    ProductModule,
    AuthModule,
    CartModule,
    CategoryModule,
    OrderModule,
    StorageModule,
    ArticleModule,
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(getMongoDB().URI, getMongoDB().DB)
  }
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
