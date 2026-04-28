import { Produto } from '../entities/produto';
export const PRODUTO_REPOSITORY = 'PRODUTO_REPOSITORY';
export interface ProdutoRepositoryInterface {
  create(data: Omit<Produto,'id'|'createdAt'|'updatedAt'>): Promise<Produto>;
  findAll(): Promise<Produto[]>;
  findById(id: string): Promise<Produto | null>;
  update(id: string, data: Partial<Produto>): Promise<Produto>;
  delete(id: string): Promise<void>;
  decrementStock(id: string, quantidade: number): Promise<void>;
}