import { Module } from '@nestjs/common';
import { ProdutosController } from './controllers/produtos.controller';
import { ProdutosService } from './services/produtos.service';
import { PRODUTO_REPOSITORY } from '../../domain/contracts/produto.repository.interface';
import { PrismaProdutoRepository } from '../../infra/repositories/prisma-produto.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProdutosController],
  providers: [
    ProdutosService,
    {
      provide: PRODUTO_REPOSITORY,
      useClass: PrismaProdutoRepository,
    },
  ],
  exports: [ProdutosService, PRODUTO_REPOSITORY],
})
export class ProdutosModule {}
