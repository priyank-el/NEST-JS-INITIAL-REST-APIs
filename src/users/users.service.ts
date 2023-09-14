import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import * as bcrypt from 'bcrypt';
import updateUserDTO from 'dto/user.dto';

@Injectable()
export class UsersService {

    constructor(
      @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
    ) { }
  
    async getAllUsers(): Promise<User[]> {
      return await this.UserModel.find();
    }
  
    async createUser(user: User): Promise<User> {
      const hasedPassword = await bcrypt.hash(user.password, 10);
      return await this.UserModel.create({
        name: user.name,
        email: user.email,
        password: hasedPassword
      })
    }
  
    async updateUser(id, user: User): Promise<object> {
      await this.UserModel.findByIdAndUpdate(id, user, {
        new: true
      })
      const userdto = new updateUserDTO();
      userdto.name = user.name;
      userdto.email = user.email;
      userdto.password = user.password;
  
      return userdto;
    }
  
    async getUserById(id): Promise<User> {
      return await this.UserModel.findById(id).exec();
    }
  
    async deleteUserById(id): Promise<User> {
      return await this.UserModel.findByIdAndDelete(id)
    }
  
    async getUser(id: string) {
      return await this.UserModel.findById(id)
    }
  
    async findByEmail(email: string): Promise<User> {
      console.log(email);
      return await this.UserModel.findOne({ email });
    }
  }
