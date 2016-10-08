import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';

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
  <Game cards={cards}
        currentUser='adam'
        joinTeam={() => {}}
        setMastermind={() => {}}/>,
  document.getElementById('app')
);
