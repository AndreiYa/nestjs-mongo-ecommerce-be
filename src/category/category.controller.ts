import {Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, UseGuards} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {Category} from "./schema/category.schema";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Role} from "../auth/enums/role.enum";
import {Roles} from "../auth/decorators/roles.decorator";
import {CreateCategoryDto} from "./dto/create-category.dto";
import {IdValidationPipe} from "../helpers/pipes/idValidation.pipe";

@Controller('store/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('/')
  async getCategories(): Promise<Category[]> {
    return await this.categoryService.getCategories()
  }

  @Post('/')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto)
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async updateCategory(@Param('id', IdValidationPipe) id: string, @Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryService.updateCategory(id, createCategoryDto)
    if (!category) throw new NotFoundException('Category does not exist!')
    return category;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async deleteCategory(@Param('id', IdValidationPipe) id: string): Promise<Category> {
    const category = await this.categoryService.deleteCategory(id)
    if (!category) throw new NotFoundException('Category does not exist!')
    return category
  }
}
