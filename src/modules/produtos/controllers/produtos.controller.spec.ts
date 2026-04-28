import { Test, TestingModule } from '@nestjs/testing';
import { ProdutosController } from './produtos.controller';
import { ProdutosService } from '../services/produtos.service';

describe('ProdutosController', () => {
  let controller: ProdutosController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProdutosController],
      providers: [
        {
          provide: ProdutosService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ProdutosController>(ProdutosController);
  });

  it('should create a product', async () => {
    const dto = {
      nome: 'Notebook',
      descricao: 'Gamer',
      preco: 3500,
      estoque: 5,
    };

    mockService.create.mockResolvedValue({
      id: '1',
      ...dto,
    });

    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result.nome).toBe('Notebook');
  });
});
