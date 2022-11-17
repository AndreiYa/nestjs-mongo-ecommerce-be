import {Controller, Post, UploadedFiles, UseGuards, UseInterceptors} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {RolesGuard} from "../auth/guards/roles.guard";
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../auth/enums/role.enum";
import {FileInterceptor} from "@nestjs/platform-express";
import {StorageResponse} from "./dto/storage.response";
import {StorageService} from "./storage.service";

@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('storage'))
  async uploadFile(@UploadedFiles() files: Express.Multer.File[]): Promise<StorageResponse[]> {
    return this.storageService.saveFiles(files)
  }

}
