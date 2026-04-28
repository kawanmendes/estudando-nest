import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import type { Produto } from '../src/domain/entities/produto';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve criar um produto', async () => {
    return request(app.getHttpServer())
      .post('/produtos')
      .send({
        nome: 'Notebook',
        descricao: 'Notebook Gamer',
        preco: 3500,
        estoque: 5,
      })
      .expect(201)
      .expect((res: request.Response) => {
        const body: Produto = res.body;

        expect(body.nome).toBe('Notebook');
        expect(body.preco).toBe(3500);
        expect(body.estoque).toBe(5);
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
