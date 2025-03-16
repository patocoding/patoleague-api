import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChampionshipService } from './championship.service';
import { CreateChampionshipDto } from './dto/create-championship.dto';
import { UpdateChampionshipDto } from './dto/update-championship-dto';
import { Public } from 'src/auth/public.decorator';

@Controller('championships')
export class ChampionshipController {
  constructor(private readonly championshipService: ChampionshipService) {}

  @Post()
  @Public()
  create(@Body() createChampionshipDto: CreateChampionshipDto) {
    return this.championshipService.create(createChampionshipDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.championshipService.findAll();
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.championshipService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  update(@Param('id') id: string, @Body() updateChampionshipDto: UpdateChampionshipDto) {
    return this.championshipService.update(+id, updateChampionshipDto);
  }

  @Delete(':id')
  @Public()
  remove(@Param('id') id: string) {
    return this.championshipService.remove(+id);
  }
}
