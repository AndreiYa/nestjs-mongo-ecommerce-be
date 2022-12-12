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

@Module({
  imports: [
    // MongooseModule.forRoot(`mongodb://root:P@rT0fin)@45.130.151.197:27017`),
    MongooseModule.forRoot(`mongodb://root:parfPass@92.255.111.60:27017`),
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
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).forRoutes({
  //     path: '*',
  //     method: RequestMethod.ALL,
  //   });
  // }
}
