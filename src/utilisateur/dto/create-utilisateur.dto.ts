import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUtilisateurDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  nom: string;

  @IsString()
  prenom: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
