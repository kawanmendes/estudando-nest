import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { VendaRepositoryInterface } from '../../domain/contracts/venda.repository.interface';
import type { Venda } from '../../domain/entities/venda';

@Injectable()
export class PrismaVendaRepository implements VendaRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Omit<Venda, 'id'>): Promise<Venda> {
    const venda = await this.prisma.venda.create({
      data,
    });

    return {
      ...venda,
      valorTotal: Number(venda.valorTotal),
    };
  }

  async findAll(): Promise<Venda[]> {
    const vendas = await this.prisma.venda.findMany();

    return vendas.map((venda) => ({
      ...venda,
      valorTotal: Number(venda.valorTotal),
    }));
  }

  async findById(id: string): Promise<Venda | null> {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
    });

    if (!venda) {
      return null;
    }

    return {
      ...venda,
      valorTotal: Number(venda.valorTotal),
    };
  }
}
