import { Module } from '@nestjs/common';
import { VendasService } from './vendas.service';
import { VendasController } from '../controller/vendas.controller';

@Module({
  controllers: [VendasController],
  providers: [VendasService],
})
export class VendasModule {}
