import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PRODUTO_REPOSITORY, ProdutoRepositoryInterface } from '../../../domain/contracts/produto.repository.interface';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Injectable()
export class ProdutosService {
 constructor(@Inject(PRODUTO_REPOSITORY) private readonly repository: ProdutoRepositoryInterface) {}
 create(dto: CreateProdutoDto) { return this.repository.create(dto); }
 findAll() { return this.repository.findAll(); }
 async findOne(id: string) { const p = await this.repository.findById(id); if (!p) throw new NotFoundException('Produto não encontrado'); return p; }
 async update(id: string, dto: UpdateProdutoDto) { await this.findOne(id); return this.repository.update(id,dto); }
 async remove(id: string) { await this.findOne(id); await this.repository.delete(id); return { message:'Produto removido com sucesso' }; }
}