import { Body, Controller, Delete, Get, HttpStatus, NotAcceptableException, Param, Post, Put, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'src/roles/role.decorator';
import { User } from 'schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService ) {}
  
    @Get()
    @Roles(['ADMIN'])
    async fetchAll(@Req() request,@Res() response) {
      const students = await this.userService.getAllUsers();
      return response
      .status(HttpStatus.OK)
      .json({
        success: true,
        result: students,
      });
    }
  
    @Post('create')
    async createUser(@Res() response,@Body() user:User){
      await this.userService.createUser(user);
      return response
      .json({message:"user created succssfully.."})
    }

    @Post('/login')
    @UseGuards(AuthGuard("local"))
    loginUser(@Req() request,@Res() response){
        console.log(request.user);
        if(!(request.user)) throw new UnauthorizedException("user not found..")
        return response
        .status(HttpStatus.OK)
        .json({message:"User login done.."})
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
      const fetchedUser = await this.userService.getUser(id);
  
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
