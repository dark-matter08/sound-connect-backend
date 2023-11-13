import { Test, TestingModule } from '@nestjs/testing';
import { TipingService } from './tiping.service';

describe('TipingService', () => {
  let service: TipingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TipingService],
    }).compile();

    service = module.get<TipingService>(TipingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
