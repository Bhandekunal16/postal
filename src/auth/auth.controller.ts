import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('upload/:key')
  async upload(@Param('key') key: string): Promise<any> {
    return await this.authService.create(key);
  }

  @Get('/check')
  async count(): Promise<any> {
    return await this.authService.count();
  }
}
