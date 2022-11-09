import {Controller, Get, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {JwtAuthGuard} from "../auth/guards/jwt.guard";
import {User} from "./schema/user.schema";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers()
  }
}
