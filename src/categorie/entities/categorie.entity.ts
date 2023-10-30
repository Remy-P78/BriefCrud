import { Produit } from "src/produit/entities/produit.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Categorie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  nom: string;

  @OneToMany(() => Produit, (produit) => produit.id_categorie)
  @JoinColumn({ name: 'id_categorie' })
  produit: Produit;
}
