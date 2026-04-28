import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { VendaRepositoryInterface } from '../../domain/contracts/venda.repository.interface';

@Injectable()
export class PrismaVendaRepository implements VendaRepositoryInterface {
  constructor(private readonly prisma: PrismaService) {}
  create(data) { return this.prisma.venda.create({ data }).then(v => ({ ...v, valorTotal: Number(v.valorTotal) })); }
  findAll() { return this.prisma.venda.findMany().then(items => items.map(v => ({ ...v, valorTotal: Number(v.valorTotal) }))); }
  findById(id: string) { return this.prisma.venda.findUnique({ where: { id } }).then(v => v && ({ ...v, valorTotal: Number(v.valorTotal) })); }
}