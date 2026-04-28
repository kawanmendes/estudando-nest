import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProdutosService } from '../services/produtos.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Controller('produtos')
export class ProdutosController {
 constructor(private readonly service: ProdutosService) {}
 @Post() create(@Body() dto: CreateProdutoDto) { return this.service.create(dto); }
 @Get() findAll() { return this.service.findAll(); }
 @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(id); }
 @Patch(':id') update(@Param('id') id: string, @Body() dto: UpdateProdutoDto) { return this.service.update(id,dto); }
 @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(id); }
}