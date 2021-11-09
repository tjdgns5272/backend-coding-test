import { Controller, Get, Param, Query } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { Coordinates } from './entities/coordinates.entity';
import { StoresService } from './stores.service';
import { ResponseDto } from './dto/coordinates-response.dto';

@Controller('')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  findAll(): Store[] {
    return this.storesService.findAll();
  }

  @Get(':name')
  findByName(@Param('name') name: string): Store {
    return this.storesService.findByName(name);
  }
  @Get('coordinates/postcodes')
  async getCoordsInfo(
    @Query('postcode') postcode: string | null,
  ): Promise<Coordinates[] | Coordinates> {
    return this.storesService.getCoordsInfo(postcode);
  }

  @Get('near/:postcode/:radius')
  async getNearStoreByDistance(
    @Param('radius') radius: number,
    @Param('postcode') postcode: string,
  ): Promise<ResponseDto> {
    return this.storesService.getNearStoreByDistance(postcode, +radius);
  }
}
