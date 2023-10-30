import { Categorie } from "src/categorie/entities/categorie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Produit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nom: string;

  @Column({ type: 'integer' })
  prix: number;

  @Column({ type: 'integer' })
  quantite: number;

  @Column({ type: 'integer' })
  id_categorie: number;

  @ManyToOne(() => Categorie, (categorie) => categorie.produit, {
    eager: true,
  })
  @JoinColumn({ name: 'id_categorie' })
  categorie: Categorie;
}
