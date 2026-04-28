import { Module } from '@nestjs/common';
import { ProdutosModule } from './produtos/produtos.module';
import { VendasModule } from './vendas/vendas.module';

@Module({
  imports: [ProdutosModule, VendasModule],
})
export class AppModule {}