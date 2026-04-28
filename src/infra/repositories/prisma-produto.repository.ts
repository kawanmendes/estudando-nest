import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ProdutoRepositoryInterface } from '../../domain/contracts/produto.repository.interface';
import type { Produto } from '../../domain/entities/produto';

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: Omit<Produto, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Produto> {
    const produto = await this.prisma.produto.create({
      data,
    });

    return {
      ...produto,
      preco: Number(produto.preco),
    };
  }

  async findAll(): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany();

    return produtos.map((produto) => ({
      ...produto,
      preco: Number(produto.preco),
    }));
  }

  async findById(id: string): Promise<Produto | null> {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      return null;
    }

    return {
      ...produto,
      preco: Number(produto.preco),
    };
  }

  async update(id: string, data: Partial<Produto>): Promise<Produto> {
    const produto = await this.prisma.produto.update({
      where: { id },
      data,
    });

    return {
      ...produto,
      preco: Number(produto.preco),
    };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.produto.delete({
      where: { id },
    });
  }

  async decrementStock(id: string, quantidade: number): Promise<void> {
    await this.prisma.produto.update({
      where: { id },
      data: {
        estoque: {
          decrement: quantidade,
        },
      },
    });
  }
}
