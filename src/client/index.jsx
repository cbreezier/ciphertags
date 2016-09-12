import React from 'react';
import ReactDOM from 'react-dom';

import Cards from './components/Cards';

const cards = [
  'Word',
  'Apple',
  'Pear',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word',
  'Word'
];

ReactDOM.render(
  <Cards cards={cards}/>,
  document.getElementById('cardSection')
);
