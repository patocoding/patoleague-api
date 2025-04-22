import { IsOptional, IsInt, IsDateString, IsEnum } from 'class-validator';

export class UpdateMatchDto {
  @IsOptional()
  @IsInt()
  teamHomeScore?: number;

  @IsOptional()
  @IsInt()
  teamAwayScore?: number;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsEnum(['Agendado', 'Em andamento', 'Finalizado'])
  status?: string;
}
