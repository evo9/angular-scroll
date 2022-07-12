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
      image: i % 2 === 0 ? `https://picsum.photos/50/50?random=${i}` : null,
    });
  }

  return items;
}
