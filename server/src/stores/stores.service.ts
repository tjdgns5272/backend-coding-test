import {Injectable, NotFoundException} from '@nestjs/common';
import {Store} from "./entities/store.entity";
import data from '../../stores.json';
@Injectable()
export class StoresService {

  findAll() : Store[] {
    return data;
  }

  findByName(name: string) : Store{

    const targetData = data.find(el => el.name === name)

    if(!targetData) {
      throw new NotFoundException('찾을 수 없는 상점입니다.')
    } else {
      return targetData;
    }
  }
}
