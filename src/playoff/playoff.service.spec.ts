import { Test, TestingModule } from '@nestjs/testing';
import { PlayoffService } from './playoff.service';

describe('PlayoffService', () => {
  let service: PlayoffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayoffService],
    }).compile();

    service = module.get<PlayoffService>(PlayoffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
