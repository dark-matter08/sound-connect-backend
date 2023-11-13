import { Test, TestingModule } from '@nestjs/testing';
import { TipingController } from './tiping.controller';

describe('TipingController', () => {
  let controller: TipingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipingController],
    }).compile();

    controller = module.get<TipingController>(TipingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
