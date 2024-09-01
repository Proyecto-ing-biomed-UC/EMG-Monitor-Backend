import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // Método para validar al usuario
  async validateUser(username: string, pass: string): Promise<any> {
    // Aquí deberías implementar la lógica para buscar al usuario en tu base de datos
    const user = { id: 1, username: 'test', password: await bcrypt.hash('test', 10) }; // Ejemplo de usuario
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // Método para hacer login y generar un token JWT
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

