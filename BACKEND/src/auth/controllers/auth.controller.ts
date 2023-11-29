import {
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
  recuperarPassword(@Param('email') email: string) {
    return this.authService.sendRecovery(email);
  }

  @Post('change-password')
  changePassword(@Req() req: Request, @Query('token') token: string) {
    const newPassword = req.body.newPassword;
    // `token: ${req.body.newPassword}, token: ${token}`;
    return this.authService.changePassword(token, newPassword);
  }
}
