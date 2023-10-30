import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCategorieDto {
  id: number;
  
  @IsNotEmpty()
  @IsString()
  nom: string;
}
