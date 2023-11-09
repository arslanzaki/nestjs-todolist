import { Controller, UseGuards, Post, Request, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/registration.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    const { username, password } = registrationDto;

    const existingUser = await this.authService.validateUser(
      username,
      password,
    );
    if (existingUser) {
      throw new Error('Username is already in use');
    }
    const hashedPassword = await this.authService.hashPassword(password);
    return await this.authService.register(username, hashedPassword);
    
  }
}
