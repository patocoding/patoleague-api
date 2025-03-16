import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { SignInResultDto } from './dto/signInResultDto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService){}

    async signIn(email: string, pass: string) : Promise<SignInResultDto> {
        const user = await this.userService.findByEmail(email)
    
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado.')
        }

       const payload = { sub: user.id, email: user.email }

       const usuarioValidado = await this.validateUser(email, pass)
       
       if (!usuarioValidado) {
        throw new UnauthorizedException()
       }

       const access_token = await this.jwtService.signAsync(payload);

       return {
        access_token,
        user
       } 
    }

    async validateUser(email : string, pass: string) : Promise<boolean> {
        const user = await this.userService.findByEmail(email)
        if (!user) return false;
        const isMatch = compare(pass, user.password)
        return await isMatch
    }
}
