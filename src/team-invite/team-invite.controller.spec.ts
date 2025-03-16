import { Test, TestingModule } from '@nestjs/testing';
import { TeamInviteController } from './team-invite.controller';

describe('TeamInviteController', () => {
  let controller: TeamInviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamInviteController],
    }).compile();

    controller = module.get<TeamInviteController>(TeamInviteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
