import { loremIpsum } from 'lorem-ipsum';

export const generateItems = (index: number, count: number = 10) => {
  const items = [];
  const end = index + count;

  for (let i = index; i < end; i++) {
    items.push({
      id: i,
      text: loremIpsum({
        count: 1,
        units: 'paragraph',
      }),
      image: getRandomImage(i),
    });
  }

  return items;
}

export const getRandomImage = (index: number) => {
    if (index % 2 !== 0) {
      return null;
    }

    const max = images.length - 1;

    return images[Math.floor(Math.random() * max)];
}


const images = [
  '/assets/images/pic.jpg',
  '/assets/images/dummy_img.jpg',
  '/assets/images/dummy_job.png',
  '/assets/images/dummy_avatar.jpg',
  '/assets/images/map.png',
  '/assets/images/mLO6ILUbADA.jpg',
  '/assets/images/nWiS2rgtVts.jpg',
];
