import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/models/user.model';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public login(@Body() body: Pick<User, 'email' | 'password'>): Promise<User> {
    return this.authService.login(body.email, body.password);
  }
  @Post('register')
  public register(@Body() body: AuthDto) {
    return this.authService.register(body);
  }
}
