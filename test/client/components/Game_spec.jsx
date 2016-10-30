import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {expect} from 'chai';
import Game from '../../../src/client/components/Game';

describe('Game', () => {
  it('renders two team lists and a card section', () => {
    const card = {
      word: "apple",
      team: "red",
      revealed: false
    }
    const cards = Array(25).fill(card);
    const socketMock = {
      on: (string, cb) => {
        console.log(string);
      }
    };
    const component = renderIntoDocument(
      <Game
            socket={socketMock}
            cards={cards}
            joinTeam={null}
            setMastermind={null}
            currentUser={"kimberly"} />
    );

    const teams = scryRenderedDOMComponentsWithClass(component, "teamList");
    expect(teams.length).to.equal(2);

    const cardsDOM = findRenderedDOMComponentWithClass(component, "cards");
    expect(cardsDOM).to.be.ok;

    const cardDOMs = scryRenderedDOMComponentsWithClass(component, "card");
    expect(cardDOMs.length).to.equal(25);
  });
});
