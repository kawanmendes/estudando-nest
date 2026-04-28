import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
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
      preco: 3500
    })
    .expect(201)
    .expect((res) => {
      expect(res.body.nome).toBe('Notebook');
    });
});

  afterEach(async () => {
    await app.close();
  });
});
