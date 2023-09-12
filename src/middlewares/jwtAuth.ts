import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class Jwtmiddleware implements NestMiddleware {
  constructor(private readonly jwt:JwtService,private readonly userService:UserService){}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req.headers);
    const headerToekn = req.headers.authorization;

    const token = headerToekn.split(" ")[1];
    const email = await this.jwt.verify(token,{
      secret:'!9rzIVf1Aw7c53l1AmdmwvZzSg?q=RdXaQRRllTkxwxSvLgvvXYU3I532hw6A?bGh1uAUBkP-Cvxn0MjAcaqkDqAo1YysJ4fDjlcDyj5s/LwbVRKHlJXImgdndYqKQ86iY2hmFxNW?1GdgBkLfAFDHrsRpniI8PvM/9CpdD1s88Vxi3g8M3fgg/ejHLHRgOA42?=3OoS0h6gYj6XSys!18UuKtiXpyk2XGRN0dv96HSncMH!p?havgzz8oYX/lxW'
    })
    const user = await this.userService.findByEmail(email);
    req.user = user;
    next();
  }
}
