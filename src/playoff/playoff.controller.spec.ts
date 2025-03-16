import { Test, TestingModule } from '@nestjs/testing';
import { PlayoffController } from './playoff.controller';

describe('PlayoffController', () => {
  let controller: PlayoffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayoffController],
    }).compile();

    controller = module.get<PlayoffController>(PlayoffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
