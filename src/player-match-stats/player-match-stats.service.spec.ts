import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMatchStatsService } from './player-match-stats.service';

describe('PlayerMatchStatsService', () => {
  let service: PlayerMatchStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayerMatchStatsService],
    }).compile();

    service = module.get<PlayerMatchStatsService>(PlayerMatchStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
