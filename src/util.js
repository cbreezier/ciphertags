import {fromJS} from 'immutable';
import {Game} from './core';

let wordList = require('./words.json');

/**
 * From http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array-in-javascript
 */
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function generateRandomCards() {
  shuffle(wordList);

  let words = [];

  let teams = [{
    name: Game.TEAM_RED,
    number: 8
  }, {
    name: Game.TEAM_BLUE,
    number: 7
  }, {
    name: Game.ASSASSIN,
    number: 1
  }, {
    name: Game.CIVILIAN,
    number: 9
  }];

  let ptr = 0;
  teams.forEach(team => {
    for (let i = 0; i < team.number; i++) {
      words.push({
        word: wordList[ptr++],
        team: team.name,
        revealed: false
      });
    }
  });

  shuffle(words);

  return fromJS(words);
}

export {
  generateRandomCards
}
