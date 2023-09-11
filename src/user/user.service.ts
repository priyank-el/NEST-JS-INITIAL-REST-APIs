import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>
    ) {}

  async getAllUsers():Promise<User[]> {
    return await this.UserModel.find();
  }

  async createUser(user:User):Promise<User>{
    return await this.UserModel.create({
        name:user.name,
        email:user.email,
        password:user.password
    })
  }

  async updateUser(id,user:User):Promise<User>{
    return await this.UserModel.findByIdAndUpdate(id,user,{
        new:true
    })
  }

  async getUserById(id):Promise<User>{
    return await this.UserModel.findById(id).exec();
  }

  async deleteUserById(id):Promise<User>{
    return await this.UserModel.findByIdAndDelete(id)
  }
}
