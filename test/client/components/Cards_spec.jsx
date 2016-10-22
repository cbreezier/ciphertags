import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass
} from 'react-addons-test-utils';
import {expect} from 'chai';
import Cards from '../../../src/client/components/Cards';

describe('Cards', () => {
  it('renders exactly 25 cards with correct fields', () => {
    const card = {
      word: "word",
      team: "red",
      revealed: true
    };
    const cards = [card, card, card, card, card,
                  card, card, card, card, card,
                  card, card, card, card, card,
                  card, card, card, card, card,
                  card, card, card, card, card,
                  card, card, card, card, card
                  ];
    const component = renderIntoDocument(
      <Cards cards={cards} />  
    );

    const cardsDOM = findRenderedDOMComponentWithClass(component, "cards");
    const cardDOMs = scryRenderedDOMComponentsWithClass(component, "card");
    expect(cardDOMs.length).to.equal(25);
    cardDOMs.forEach((cardDOM) => {
      expect(cardDOM.textContent).to.equal(card.word);
      expect(cardDOM.className).to.equal("card red");
    });
  });
});
