import { Test, TestingModule } from '@nestjs/testing';
import { PlayerWeekService } from './player-week.service';

describe('PlayerWeekService', () => {
  let service: PlayerWeekService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerWeekService],
    }).compile();

    service = module.get<PlayerWeekService>(PlayerWeekService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
