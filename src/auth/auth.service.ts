import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/users.schema';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(credentials: LoginDto) {
    const { username, password } = credentials;
    const user = await this.validateUser(username, password);
    if (user) {
      const token = this.generateJwtToken(user);
      return {
        access_token: token,
        user: user,
      };
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  private generateJwtToken(user: User) {
    const payload = { username: user.username, sub: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return token;
  }

  async register(username: string, password: string) {
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }

  async hashPassword(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
