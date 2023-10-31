import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CategorieService } from './categorie.service';
import { CreateCategorieDto } from './dto/create-categorie.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorie')
export class CategorieController {
  constructor(private readonly categorieService: CategorieService) {}

  @Post()
  @UseGuards(AuthGuard())
  create(@Body() createCategorieDto: CreateCategorieDto) {
    return this.categorieService.create(createCategorieDto);
  }

  @Get()
  findAll() {
    return this.categorieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categorieService.findOne(+id);
  }
}
