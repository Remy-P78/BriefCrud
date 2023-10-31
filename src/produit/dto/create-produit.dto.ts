import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProduitDto {
  
  id: number;

  @IsString()
  nom: string;

  @IsInt()
  prix: number;

  @IsInt()
  quantite: number;

  @IsInt()
  id_categorie: number;
}
