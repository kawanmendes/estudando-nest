import { Test, TestingModule } from '@nestjs/testing';
import { VendasController } from './vendas.controller';
import { VendasService } from '../services/vendas.service';

describe('VendasController', () => {
  let controller: VendasController;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendasController],
      providers: [
        {
          provide: VendasService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<VendasController>(VendasController);
  });

  it('should register a sale', async () => {
    const dto = {
      produtoId: '1',
      quantidade: 2,
    };

    mockService.create.mockResolvedValue({
      id: 'sale1',
      produtoId: '1',
      quantidade: 2,
      valorTotal: 200,
    });

    const result = await controller.create(dto);

    expect(mockService.create).toHaveBeenCalledWith(dto);
    expect(result.valorTotal).toBe(200);
  });
});
