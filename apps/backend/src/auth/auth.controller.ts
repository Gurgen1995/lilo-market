// apps/backend/src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }, @Res({ passthrough: true }) response: Response) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).json({ message: 'Invalid credentials' });
    }
    
    const { access_token, refresh_token } = await this.authService.login(user);
    
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    
    return response.json({
      access_token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
      }
    });
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string; firstName?: string; lastName?: string }) {
    return this.authService.register(
      registerDto.email,
      registerDto.password,
      registerDto.firstName,
      registerDto.lastName
    );
  }

  @Post('refresh')
  async refresh(@Req() request: Request) {
    const refreshToken = request.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }
    
    try {
      const payload = this.jwtService.verify(refreshToken, { 
        secret: process.env.JWT_REFRESH_SECRET 
      });
      
      const user = await this.usersService.findOne(payload.sub);
      return this.authService.refreshToken(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('refresh_token');
    return response.json({ message: 'Logged out successfully' });
  }
}