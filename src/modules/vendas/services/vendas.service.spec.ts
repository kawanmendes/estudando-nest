import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { VendasService } from './vendas.service';
import { VENDA_REPOSITORY } from '../../../domain/contracts/venda.repository.interface';
import { PRODUTO_REPOSITORY } from '../../../domain/contracts/produto.repository.interface';

describe('VendasService', () => {
  let service: VendasService;

  const mockVendaRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  const mockProdutoRepository = {
    findById: jest.fn(),
    decrementStock: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendasService,
        {
          provide: VENDA_REPOSITORY,
          useValue: mockVendaRepository,
        },
        {
          provide: PRODUTO_REPOSITORY,
          useValue: mockProdutoRepository,
        },
      ],
    }).compile();

    service = module.get<VendasService>(VendasService);
  });

  describe('create', () => {
    it('should create sale and decrement stock', async () => {
      mockProdutoRepository.findById.mockResolvedValue({
        id: '1',
        nome: 'Teclado',
        preco: 100,
        estoque: 10,
      });

      mockVendaRepository.create.mockResolvedValue({
        id: 'sale1',
        produtoId: '1',
        quantidade: 2,
        valorTotal: 200,
      });

      const dto = {
        produtoId: '1',
        quantidade: 2,
      };

      const result = await service.create(dto);

      expect(mockProdutoRepository.findById).toHaveBeenCalledWith('1');

      expect(mockProdutoRepository.decrementStock).toHaveBeenCalledWith('1', 2);

      expect(mockVendaRepository.create).toHaveBeenCalled();

      expect(result.valorTotal).toBe(200);
    });

    it('should throw if product not found', async () => {
      mockProdutoRepository.findById.mockResolvedValue(null);

      await expect(
        service.create({
          produtoId: '1',
          quantidade: 1,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw if stock is insufficient', async () => {
      mockProdutoRepository.findById.mockResolvedValue({
        id: '1',
        nome: 'Mouse',
        preco: 50,
        estoque: 1,
      });

      await expect(
        service.create({
          produtoId: '1',
          quantidade: 5,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
