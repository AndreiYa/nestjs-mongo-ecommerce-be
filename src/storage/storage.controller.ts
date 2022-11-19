import {
  Controller,
  HttpException, HttpStatus,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../auth/enums/role.enum";
import {FilesInterceptor} from "@nestjs/platform-express";
import {StorageService} from "./storage.service";

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FilesInterceptor('image'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]) {
    const isImages = files.every(i => i.mimetype.includes('image'))
    if (isImages) return this.storageService.covertAndSave(files)
    throw new HttpException('Only image allow', HttpStatus.FORBIDDEN)
  }
}
