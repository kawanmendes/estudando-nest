import { Module } from '@nestjs/common';
import { ProdutosModule } from './modules/produtos/produtos.module';
import { VendasModule } from './modules/vendas/vendas.module';

@Module({
  imports: [ProdutosModule, VendasModule],
})
export class AppModule {}