import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'schemas/user.schema';

@Controller('users')

export class UserController {
  constructor(private readonly userService:UserService ) {}

  @Get()
  async fetchAll(@Res() response) {
    const students = await this.userService.getAllUsers();

    return response
    .status(HttpStatus.OK)
    .json({
      success: true,
      result: students,
    });
  }

  @Post()
  async createUser(@Res() response,@Body() user:User){
    await this.userService.createUser(user);
    return response
    .json({message:"user created succssfully.."})
  }

  @Put('/:id')
  async updateUser(@Res() response,@Param('id') id,@Body() user:User){
    const newUser = await this.userService.updateUser(id,user);

    return response
    .json({
        message:'user updated..',
        user:newUser
    })
  }

  @Get('/:id')
  async getUserById(@Res() response,@Param('id') id){
    const fetchedUser = await this.userService.getUserById(id);

    return response
    .json({user:fetchedUser})
  }

  @Delete('/:id')
  async deleteUser(@Res() response,@Param('id') id){
    const user = await this.userService.deleteUserById(id);

    return response
    .json({message:'User deleted successfully..'})
  }
}
