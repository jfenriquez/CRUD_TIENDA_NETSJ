import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { Request } from 'express';

import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { get } from 'http';
import { use } from 'passport';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }

  @Post('recovery')
  recuperarPassword(@Body('email') email: string) {
    console.log('mailcontroller', email);
    return this.authService.sendRecovery(email);
  }

  @Post('change-password')
  changePassword(@Req() req: Request, @Query('token') token: string) {
    const newPassword = req.body.newPassword;
    // `token: ${req.body.newPassword}, token: ${token}`;
    return this.authService.changePassword(token, newPassword);
  }

  /////find user by token
  @UseGuards(AuthGuard('jwt'))
  @Post('find')
  findUserByToken(@Req() req: Request) {
    const token = req.headers['authorization'];
    console.log('token', token.split(' ')[1]);
    return this.authService.findUserByToken(token.split(' ')[1]);
  }
}
