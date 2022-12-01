import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Article, ArticleDocument} from "./schema/article.schema";
import {ArticleDTO} from "./dto/article.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>
  ) { }

  async getArticles() {
    return this.articleModel.find();
  }

  async getArticle(id: string): Promise<Article> {
    return this.articleModel.findById(id)
  }

  async addArticle(articleDto: ArticleDTO): Promise<Article> {

    const newArticle = await this.articleModel.create(articleDto)
    return newArticle.save()
  }

  async updateArticle(id: string, articleDto: ArticleDTO): Promise<Article> {
    return this.articleModel.findByIdAndUpdate(id, articleDto, {new: true});
  }

  async deleteArticle(id: string) {
    return this.articleModel.findByIdAndRemove(id)
  }
}
