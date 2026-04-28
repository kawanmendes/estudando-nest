import { Test, TestingModule } from '@nestjs/testing';
import { VendasController } from './vendas.controller';
import { VendasService } from '../services/vendas.service';

describe('VendasController', () => {
  let controller: VendasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VendasController],
      providers: [
        {
          provide: VendasService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<VendasController>(VendasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});