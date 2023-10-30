import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { UpdateCategorieDto } from './dto/update-categorie.dto';
import { Categorie } from './entities/categorie.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategorieService {

  constructor(
    @InjectRepository(Categorie) private categorieRepository: Repository<Categorie>,
  ) { }
  async create(createCategorieDto: CreateCategorieDto) {
    const newCategorie = this.categorieRepository.create(createCategorieDto);
    const result = await this.categorieRepository.save(newCategorie);
    return result;
  }

  async findAll() {
    return await this.categorieRepository.find();
  }

  async findOne(id: number) {
    const found = await this.categorieRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(
        `The categorie with id number ${id} is not found !`,
      );
    }
    return found;
  }

  // update(id: number, updateCategorieDto: UpdateCategorieDto) {
  //   return `This action updates a #${id} categorie`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} categorie`;
  // }
}
