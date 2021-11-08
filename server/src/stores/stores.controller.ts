import { Controller, Get, Param } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { Coordinates } from './entities/coordinates.entity';
import { StoresService } from './stores.service';
import { ResponseDto } from "./dto/coordinates-response.dto";

@Controller('')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll() : ResponseDto {
    return this.storesService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string) : ResponseDto {
    return this.storesService.findByName(name);
  }
  @Get('coordinates/:postcode')
  async getCoordsInfo(@Param('postcode') postcode: string) : Promise<ResponseDto> {
    return this.storesService.getCoordsInfo(postcode);
  }
}