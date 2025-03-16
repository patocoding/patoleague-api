import { IsInt, IsPositive, Min, Max, IsOptional } from 'class-validator';

export class CreatePlayerMatchStatsDto {
  @IsInt() playerId: number;
  @IsInt() matchId: number;

  @IsInt() @Min(0) fgm: number;
  @IsInt() @Min(0) fga: number;
  
  @IsInt() @Min(0) threePm: number;
  @IsInt() @Min(0) threePa: number;
  
  @IsInt() @Min(0) ftm: number;
  @IsInt() @Min(0) fta: number;
  
  @IsInt() @Min(0) oreb: number;
  @IsInt() @Min(0) dreb: number;
  @IsInt() @Min(0) treb: number;

  @IsInt() @Min(0) ast: number;
  @IsInt() @Min(0) stl: number;
  @IsInt() @Min(0) blk: number;
}
