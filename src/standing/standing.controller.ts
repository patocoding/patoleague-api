import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { StandingService } from './standing.service';
import { UpdateStandingDto } from './dto/update-standing.dto';
import { Public } from 'src/auth/public.decorator';

@Controller('standings')
export class StandingController {
  constructor(private readonly standingService: StandingService) {}

  @Get()
  @Public()
  findAll() {
    return this.standingService.findAll();
  }

  @Get('championship/:id')
  @Public()
  findByChampionship(@Param('id') id: string) {
    return this.standingService.findByChampionship(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateStandingDto: UpdateStandingDto) {
    return this.standingService.update(+id, updateStandingDto);
  }
}
