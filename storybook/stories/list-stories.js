import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Container, List} from '@src/components/elements';
import Chance from 'chance'
const chance = new Chance();

const data = Array(15)
  .fill(0)
  .map((_) => ({
    id: chance.string({ length: 8, casing: 'upper', alpha: true, numeric: true }),
    title: chance.paragraph({
      sentences: 4
    }),
    subTitle: chance.paragraph({
      sentences: 6
    }),
  }));

storiesOf('List', module).add('List', () => (
  <Container style={{padding: 10}}>
    <List data={data} />
  </Container>
));
