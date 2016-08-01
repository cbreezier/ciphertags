import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import {Game, INITIAL_STATE} from '../src/core';
import makeStore from '../src/store';

describe('store', () => {
  function makeCard(word, team) {
    return fromJS({
      word: word,
      team: team,
      revealed: false
    });
  }
  
  it('is a redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(INITIAL_STATE);

    const cards = List.of(
      makeCard('fish', Game.TEAM_RED),
      makeCard('bottle', Game.TEAM_BLUE),
      makeCard('bin', Game.ASSASSIN)
    );
    store.dispatch({
      type: 'SET_CARDS',
      cards: cards
    });

    expect(store.getState()).to.equal(Map({
      players: Map({
        red: Map({
          agents: List()
        }),
        blue: Map({
          agents: List()
        })
      }),
      cards: cards,
      turn: Map({
        turnNumber: 0,
        team: Game.TEAM_RED
      })
    }));
  });
});
