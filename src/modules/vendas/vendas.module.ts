import { Module } from '@nestjs/common';
import { VendasController } from './controllers/vendas.controller';
import { VendasService } from './services/vendas.service';
import { VENDA_REPOSITORY } from '../../domain/contracts/venda.repository.interface';
import { PrismaVendaRepository } from '../../infra/repositories/prisma-venda.repository';
import { ProdutosModule } from '../produtos/produtos.module';

@Module({
  imports: [ProdutosModule],
  controllers: [VendasController],
  providers: [
    VendasService,
    {
      provide: VENDA_REPOSITORY,
      useClass: PrismaVendaRepository,
    },
  ],
})
export class VendasModule {}
