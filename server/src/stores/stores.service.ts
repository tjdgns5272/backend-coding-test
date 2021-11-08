import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from "./entities/store.entity";
import { Coordinates } from "./entities/coordinates.entity";
import { ResponseDto } from "./dto/coordinates-response.dto";
import data from '../../stores.json';
import axios from 'axios'
@Injectable()
export class StoresService {

  findAll() : ResponseDto {
    return {
      status: 200,
      result: data,
      message: '모든 상점 조회했습니다.'
    };
  }

  findByName(name: string) : ResponseDto{
    const targetData = data.find(el => el.name === name)
    if(targetData) {
      return {
        status: 200,
        result: targetData,
        message: '상점 조회 성공했습니다.'
      };
    } else {
      throw new NotFoundException('찾을 수 없는 상점입니다.')
    }
  }

  async getCoordsInfo(postcode: string) : Promise<ResponseDto> {
    try {
      await axios.get(`https://api.postcodes.io/postcodes/${postcode}/validate`)

      const result = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
      const { latitude, longitude } = result.data["result"]

      return {
        status: 200,
        result: {
          postcode,
          latitude,
          longitude
        },
        message: '좌표를 성공적으로 조회했습니다.'
      }
    } catch (e) {
      throw new NotFoundException('유효하지 않은 우편 번호입니다.')
    }

  }
}
