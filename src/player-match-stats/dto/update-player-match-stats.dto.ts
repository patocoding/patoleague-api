import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerMatchStatsDto } from './create-player-match-stats.dto';

export class UpdatePlayerMatchStatsDto extends PartialType(CreatePlayerMatchStatsDto) {}

