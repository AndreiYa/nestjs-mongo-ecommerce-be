import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ProductSchema} from "../product/schema/product.schema";

@Module({
  providers: [ArticleService],
  controllers: [ArticleController],
  imports: [
    MongooseModule.forFeature([
      {name: 'Article', schema: ProductSchema}
    ])
  ]
})
export class ArticleModule {}
