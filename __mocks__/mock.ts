import {faker} from '@faker-js/faker';

export const mockedResult = Array.from({length: 20}).map(() => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    price: faker.datatype.number(),
    img: faker.image.avatar(),
  };
});
