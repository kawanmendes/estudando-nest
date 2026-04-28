import { Venda } from '../entities/venda';
export const VENDA_REPOSITORY = 'VENDA_REPOSITORY';
export interface VendaRepositoryInterface {
  create(data: Omit<Venda,'id'>): Promise<Venda>;
  findAll(): Promise<Venda[]>;
  findById(id: string): Promise<Venda | null>;
}