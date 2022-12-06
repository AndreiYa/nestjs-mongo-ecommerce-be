import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model, PipelineStage} from "mongoose";
import {Article, ArticleDocument} from "./schema/article.schema";
import {ArticleDTO} from "./dto/article.dto";
import {FilterArticleDTO} from "./dto/filterArticle.dto.";

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>
  ) { }

  async getArticles(filterArticleDTO: FilterArticleDTO) {
    if (!filterArticleDTO) {
      return this.articleModel.find().exec()
    }
    const aggregate: PipelineStage[] = [];
    if (filterArticleDTO.search && filterArticleDTO.search !== '') {
      aggregate.push(
        {
          $match: {
            $or: [
              {title: new RegExp(filterArticleDTO.search.toString(), 'i')},
              {description: new RegExp(filterArticleDTO.search.toString(), 'i')},
              {content: new RegExp(filterArticleDTO.search.toString(), 'i')},
              {tags: new RegExp(filterArticleDTO.search.toString(), 'i')},
            ]
          },
        }
      )
    }

    if (filterArticleDTO.tags) {
      const tags = filterArticleDTO.tags.split(',')
      aggregate.push(
        {
          $match: {
            tags: {$all: tags}
          }
        }
      )
    }

    const request = this.articleModel.aggregate([...aggregate]);

    const page: number = parseInt(filterArticleDTO.page as any) || 1
    const limit: number = parseInt(String(filterArticleDTO.limit)) || 9
    const total = await this.totalCount()
    const data = await request.skip((page - 1) * limit).limit(limit).exec()

    return {
      data,
      total,
      limit,
      page,
      lastPage: Math.ceil(total/limit)
    }
  }

  async totalCount(options?) {
    return this.articleModel.count(options).exec()
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
