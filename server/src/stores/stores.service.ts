import { Injectable, NotFoundException } from '@nestjs/common';
import { Store } from './entities/store.entity';
import { Coordinates } from './entities/coordinates.entity';
import { ResponseDto } from './dto/coordinates-response.dto';
import data from '../../stores.json';
import axios from 'axios';
import { storePostcodeSet } from './stores-table';
@Injectable()
export class StoresService {
  findAll(): Store[] {
    return data;
  }

  findByName(name: string): Store {
    const targetData = data.find((el) => el.name === name);
    if (targetData) {
      return targetData;
    } else {
      throw new NotFoundException('찾을 수 없는 상점 이름입니다.');
    }
  }

  async getCoordsInfo(
    postcode: string | null,
  ): Promise<Coordinates[] | Coordinates> {
    if (postcode) {
      try {
        const result = await axios.get(
          `https://api.postcodes.io/postcodes/${postcode}`,
        );
        const { latitude, longitude } = result.data.result;
        return {
          postcode,
          latitude,
          longitude,
        };
      } catch (e) {
        throw new NotFoundException('유효하지 않은 우편 번호입니다.');
      }
    } else {
      const postcodes = data.map((el) => el.postcode);
      const response = await axios
        .post(
          'https://api.postcodes.io/postcodes?filter=postcode,longitude,latitude',
          {
            postcodes,
          },
        )
        .then((res) => res.data.result);

      return response.map((el) => el.result);
    }
  }

  async getNearStoreByDistance(
    postcode: string,
    radius: number,
  ): Promise<ResponseDto> {
    try {
      // 우편번호가 유효한지 검사
      const response = await axios.get(
        `https://api.postcodes.io/postcodes/${postcode}/validate`,
      );
      const isValidPostcode = response.data.result;

      if (isValidPostcode) {
        // 영국 우편번호 기준으로 radius 반경 내에 위치한 우편번호 검색
        const locationsNearbyPostcode = await axios.get(
          `https://api.postcodes.io/postcodes/${postcode}/nearest?radius=${radius}&limit=100`,
        );

        // 앞서 검색된 우편번호 목록 중에서 db에 있는 우편 번호만 필터링
        const storesInDB = locationsNearbyPostcode.data.result.filter(
          (location) => {
            return storePostcodeSet.has(location.postcode);
          },
        );

        // DB에 일치한 정보가 있는 경우
        if (storesInDB.length !== 0) {
          const filteredStore = storesInDB.map((store) => {
            const { postcode, latitude, longitude } = store;
            return { postcode, latitude, longitude };
          });
          // 북에서 남쪽 방향 순으로 정렬
          const sortByLatitude = filteredStore.sort(
            (a, b) => b.latitude - a.latitude,
          );
          return {
            status: 200,
            result: sortByLatitude,
            message: '입력한 위치와 거리 내 상점 목록을 조회했습니다.',
          };
        } else {
          // DB에 일치한 정보가 없는 경우
          return {
            status: 200,
            result: null,
            message: '입력한 위치와 거리 내 상점이 없습니다.',
          };
        }
      } else {
        throw new NotFoundException('유효하지 않은 우편번호입니다.');
      }
    } catch (e) {
      throw new NotFoundException('유효하지 않은 우편번호입니다.');
    }
  }
}
