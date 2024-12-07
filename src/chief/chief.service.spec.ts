import { Test, TestingModule } from '@nestjs/testing';
import { ChiefService } from './chief.service';

describe('ChiefService', () => {
  let service: ChiefService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChiefService],
    }).compile();

    service = module.get<ChiefService>(ChiefService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
