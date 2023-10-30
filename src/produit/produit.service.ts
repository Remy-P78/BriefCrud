import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produit } from './entities/produit.entity';

@Injectable()
export class ProduitService {
  constructor(
    @InjectRepository(Produit) private produitRepository: Repository<Produit>,
  ) {}
  async create(createProduitDto: CreateProduitDto) {
    const newProduit = this.produitRepository.create(createProduitDto);
    const result = await this.produitRepository.save(newProduit);
    return result;
  }

  async findAll() {
    return await this.produitRepository.find();
  }

  async findOne(id: number) {
    const found = await this.produitRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The produit with id number ${id} is not found !`,
      );
    }
    return found;
  }

  async update(id: number, updateProduitDto: UpdateProduitDto) {
    await this.produitRepository.update(id, updateProduitDto);
    return this.findOne(id);
  }

  async remove(id: number) {
      const produitToRemove = await this.findOne(id);
      if (!produitToRemove) {
        throw new Error(`The produit with id number: ${id} is not found !`);
      }
      await this.produitRepository.remove(produitToRemove);
      return { message: `The produit ${id} is deleted !` };
  }
}
