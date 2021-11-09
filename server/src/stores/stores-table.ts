import data from '../../stores.json';

export const storePostcodeSet = new Set(data.map((store) => store.postcode));
