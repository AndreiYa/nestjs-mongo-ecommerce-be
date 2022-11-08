import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {Model} from 'mongoose';
import {InjectModel} from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import {User, UserDocument} from "./schema/user.schema";
import {CreateUserDTO} from "./dto/create-user-dto";

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) { }

  async addUser(createUserDTO: CreateUserDTO): Promise<User> {
    const checkUsername = await this.findUserByName(createUserDTO.username)
    const checkEmail = createUserDTO.email ? await this.findUserByEmail(createUserDTO.email) : null

    if (checkUsername || checkEmail) {
      throw new HttpException('email or username are already taken, please choose another one', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = await this.userModel.create(createUserDTO);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    return newUser.save();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findUserByName(username: string): Promise<User | undefined> {
    return this.userModel.findOne({username: username});
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email});
  }
}
