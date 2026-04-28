import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VendasService } from '../services/vendas.service';
import { CreateVendaDto } from '../dto/create-venda.dto';

@Controller('vendas')
export class VendasController {
  constructor(private readonly service: VendasService) {}

  @Post()
  create(@Body() dto: CreateVendaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
