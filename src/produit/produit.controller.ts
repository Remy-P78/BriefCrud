import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProduitService } from './produit.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('produit')
@UseGuards(AuthGuard())
export class ProduitController {
  constructor(private readonly produitService: ProduitService) {}

  @Post()  
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitService.create(createProduitDto);
  }

  @Get()
  @UseGuards(AuthGuard())
  findAll() {
    return this.produitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produitService.remove(+id);
  }
}
