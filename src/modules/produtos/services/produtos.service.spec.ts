import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProdutosService } from './produtos.service';
import { PRODUTO_REPOSITORY } from '../../../domain/contracts/produto.repository.interface';

describe('ProdutosService', () => {
  let service: ProdutosService;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    decrementStock: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProdutosService,
        {
          provide: PRODUTO_REPOSITORY,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProdutosService>(ProdutosService);
  });

  describe('create', () => {
    it('should create a product', async () => {
      const dto = {
        nome: 'Notebook',
        descricao: 'Notebook gamer',
        preco: 3500,
        estoque: 10,
      };

      mockRepository.create.mockResolvedValue({
        id: '1',
        ...dto,
      });

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(result.nome).toBe('Notebook');
    });
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      mockRepository.findById.mockResolvedValue({
        id: '1',
        nome: 'Mouse',
      });

      const result = await service.findOne('1');

      expect(mockRepository.findById).toHaveBeenCalledWith('1');
      expect(result.id).toBe('1');
    });

    it('should throw if product not found', async () => {
      mockRepository.findById.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete product', async () => {
      mockRepository.findById.mockResolvedValue({ id: '1' });
      mockRepository.delete.mockResolvedValue(undefined);

      const result = await service.remove('1');

      expect(mockRepository.delete).toHaveBeenCalledWith('1');
      expect(result.message).toBe('Produto removido com sucesso');
    });
  });
});
