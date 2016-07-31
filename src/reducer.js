import {Game, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CARDS':
      return Game.setCards(state, action.cards);
  }

  return state;
}
