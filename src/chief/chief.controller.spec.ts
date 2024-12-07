import { Test, TestingModule } from '@nestjs/testing';
import { ChiefController } from './chief.controller';
import { ChiefService } from './chief.service';

describe('ChiefController', () => {
  let controller: ChiefController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChiefController],
      providers: [ChiefService],
    }).compile();

    controller = module.get<ChiefController>(ChiefController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
