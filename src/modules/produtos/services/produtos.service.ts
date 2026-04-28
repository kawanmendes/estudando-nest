import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUTO_REPOSITORY } from '../../../domain/contracts/produto.repository.interface';

import type { ProdutoRepositoryInterface } from '../../../domain/contracts/produto.repository.interface';

import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Injectable()
export class ProdutosService {
  constructor(
    @Inject(PRODUTO_REPOSITORY)
    private readonly repository: ProdutoRepositoryInterface,
  ) {}

  async create(dto: CreateProdutoDto) {
    return this.repository.create(dto);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const produto = await this.repository.findById(id);

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async update(id: string, dto: UpdateProdutoDto) {
    await this.findOne(id);
    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.delete(id);

    return {
      message: 'Produto removido com sucesso',
    };
  }
}
