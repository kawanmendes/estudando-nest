import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProdutoRepositoryInterface } from '../../domain/contracts/produto.repository.interface';

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  create(data) { return this.prisma.produto.create({ data }).then(p => ({ ...p, preco: Number(p.preco) })); }
  findAll() { return this.prisma.produto.findMany().then(items => items.map(p => ({ ...p, preco: Number(p.preco) }))); }
  findById(id: string) { return this.prisma.produto.findUnique({ where: { id } }).then(p => p && ({ ...p, preco: Number(p.preco) })); }
  update(id: string, data) { return this.prisma.produto.update({ where: { id }, data }).then(p => ({ ...p, preco: Number(p.preco) })); }
  async delete(id: string) { await this.prisma.produto.delete({ where: { id } }); }
  async decrementStock(id: string, quantidade: number) { await this.prisma.produto.update({ where: { id }, data: { estoque: { decrement: quantidade } } }); }
}