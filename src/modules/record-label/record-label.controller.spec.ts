import { Test, TestingModule } from '@nestjs/testing';
import { RecordLabelController } from './record-label.controller';

describe('RecordLabelController', () => {
  let controller: RecordLabelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecordLabelController],
    }).compile();

    controller = module.get<RecordLabelController>(RecordLabelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
