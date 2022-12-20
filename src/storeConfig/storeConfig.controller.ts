import {Body, Controller, Get, Patch, UseGuards} from '@nestjs/common';
import {Roles} from "../auth/decorators/roles.decorator";
import {Role} from "../auth/enums/role.enum";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {DiscountConfig} from "./discountConfig/schema/discountConfig.schema";
import {DiscountConfigService} from "./discountConfig/discountConfig.service";
import {DiscountConfigDTO} from "./discountConfig/dto/discountConfig.dto";

@Controller('config')
export class StoreConfigController {
  constructor(private readonly discountConfigService: DiscountConfigService) {}

  @Get('discount')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async getDiscountConfig(): Promise<DiscountConfig> {
    return this.discountConfigService.getDiscountConfig()
  }

  @Patch('discount')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard)
  async updateDiscountConfig(@Body() discountConfigDTO: DiscountConfigDTO): Promise<DiscountConfig> {
    return this.discountConfigService.updateDiscountConfig(discountConfigDTO);
  }

}
