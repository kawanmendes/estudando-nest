import { Test, TestingModule } from '@nestjs/testing';
import { VendasService } from './vendas.service';
import { VENDA_REPOSITORY } from '../../../domain/contracts/venda.repository.interface';
import { PRODUTO_REPOSITORY } from '../../../domain/contracts/produto.repository.interface';

describe('VendasService', () => {
  let service: VendasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendasService,
        {
          provide: VENDA_REPOSITORY,
          useValue: {},
        },
        {
          provide: PRODUTO_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<VendasService>(VendasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});