import { ChampionshipTeamsService } from './championship-team.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ChampionshipTeamService', () => {
  let service: ChampionshipTeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampionshipTeamsService],
    }).compile();

    service = module.get<ChampionshipTeamsService>(ChampionshipTeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
