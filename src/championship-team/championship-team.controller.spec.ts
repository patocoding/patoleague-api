import { Test, TestingModule } from '@nestjs/testing';
import { ChampionshipTeamController } from './championship-team.controller';

describe('ChampionshipTeamController', () => {
  let controller: ChampionshipTeamController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampionshipTeamController],
    }).compile();

    controller = module.get<ChampionshipTeamController>(ChampionshipTeamController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
