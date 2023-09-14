import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
    constructor( private readonly usersService:UsersService ){}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        const isPassword = await bcrypt.compare(pass,user.password)
        if (user && isPassword) return user;
        return null
      }
}
