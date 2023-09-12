import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import updateUserDTO from '../../dto/user.dto';

@Injectable()

export class UserService {

  constructor(private jwtService: JwtService,
    @InjectModel(User.name) private UserModel: Model<UserDocument>
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

  async login(email: string): Promise<string> {
    const user = await this.UserModel.findOne({ email })

    if (!user) throw new NotAcceptableException('could not found user..')

    return await this.jwtService.sign(user.email,
      {
        secret: '!9rzIVf1Aw7c53l1AmdmwvZzSg?q=RdXaQRRllTkxwxSvLgvvXYU3I532hw6A?bGh1uAUBkP-Cvxn0MjAcaqkDqAo1YysJ4fDjlcDyj5s/LwbVRKHlJXImgdndYqKQ86iY2hmFxNW?1GdgBkLfAFDHrsRpniI8PvM/9CpdD1s88Vxi3g8M3fgg/ejHLHRgOA42?=3OoS0h6gYj6XSys!18UuKtiXpyk2XGRN0dv96HSncMH!p?havgzz8oYX/lxW'
      })
  }

  async findByEmail(email: string): Promise<object> {
    return await this.UserModel.findOne({ email });
  }
}
