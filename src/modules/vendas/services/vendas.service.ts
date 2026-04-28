import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VENDA_REPOSITORY, VendaRepositoryInterface } from '../../../domain/contracts/venda.repository.interface';
import { PRODUTO_REPOSITORY, ProdutoRepositoryInterface } from '../../../domain/contracts/produto.repository.interface';
import { CreateVendaDto } from '../dto/create-venda.dto';

@Injectable()
export class VendasService {
 constructor(
  @Inject(VENDA_REPOSITORY) private readonly vendaRepository: VendaRepositoryInterface,
  @Inject(PRODUTO_REPOSITORY) private readonly produtoRepository: ProdutoRepositoryInterface,
 ) {}
 async create(dto: CreateVendaDto) {
  const produto = await this.produtoRepository.findById(dto.produtoId);
  if (!produto) throw new NotFoundException('Produto não encontrado');
  if (produto.estoque < dto.quantidade) throw new BadRequestException('Estoque insuficiente');
  const valorTotal = produto.preco * dto.quantidade;
  await this.produtoRepository.decrementStock(produto.id, dto.quantidade);
  return this.vendaRepository.create({ produtoId:dto.produtoId, quantidade:dto.quantidade, valorTotal, dataVenda:new Date() });
 }
 findAll() { return this.vendaRepository.findAll(); }
 async findOne(id:string){ const v = await this.vendaRepository.findById(id); if(!v) throw new NotFoundException('Venda não encontrada'); return v; }
}