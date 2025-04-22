import { Test, TestingModule } from '@nestjs/testing';
import { PlayerMatchStatsController } from './player-match-stats.controller';

describe('PlayerMatchStatsController', () => {
  let controller: PlayerMatchStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerMatchStatsController],
    }).compile();

    controller = module.get<PlayerMatchStatsController>(PlayerMatchStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
