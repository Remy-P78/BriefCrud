import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Utilisateur)
    private utilisateurRepository: Repository<Utilisateur>,
    private jwtService: JwtService
  ) {}
  async register(createAuthDto: CreateAuthDto) {
    const { nom, prenom, email, password } = createAuthDto;

    // hashage du mot de passe
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // création d'une entité user
    const user = this.utilisateurRepository.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
    });

    try {
      // enregistrement de l'entité user
      const createdUser = await this.utilisateurRepository.save(user);
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      // gestion des erreurs
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto) {
    	const { email, password } = loginDto;
      const user = await this.utilisateurRepository.findOneBy({ email });

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload = { email: user.email };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
      } else {
        throw new UnauthorizedException(
          'Ces identifiants ne sont pas bons, déso...',
        );
      }
  }
}
