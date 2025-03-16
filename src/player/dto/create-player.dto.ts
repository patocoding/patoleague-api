import { IsNotEmpty, IsInt, Min, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nickname: string; //

  @IsOptional()
  @IsInt()
  jerseyNumber?: number;

  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  pointsPerGame?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  assistsPerGame?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  reboundsPerGame?: number;

  @IsNotEmpty()
  userId: number;

  @IsOptional()
  teamId?: number;
}