import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProduitDto {
  @IsInt()
  @IsNotEmpty()
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
