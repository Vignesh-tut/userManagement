import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async generateToken(payLoad:{}) {
    return {
      access_token: this.jwtService.sign(payLoad),
    };
  }
}
