import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Category} from "./schema/category.schema";
import {CreateCategoryDto} from "./dto/create-category.dto";

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec()
  }

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>{
    const newCategory = await this.categoryModel.create(createCategoryDto)
    return newCategory.save()
  }

  async updateCategory(id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryModel.findByIdAndUpdate(id, createCategoryDto, {new: true})
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove(id)
  }
 }
