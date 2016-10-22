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
  it('renders exactly 25 cards with correct word', () => {
    const card = {
      word: "word",
      team: "red",
      revealed: false
    };
    const cards = Array(30).fill(card);
    const component = renderIntoDocument(
      <Cards cards={cards} />  
    );

    const cardsDOM = findRenderedDOMComponentWithClass(component, "cards");
    const cardDOMs = scryRenderedDOMComponentsWithClass(component, "card");
    expect(cardDOMs.length).to.equal(25);
    expect(cardDOMs[0].textContent).to.equal(card.word);
    expect(cardDOMs[0].className).to.equal("card ");
  });

  it('renders team if card is revealed', () => {
    const card = {
      word: "word",
      team: "red",
      revealed: true
    };
    const cards = Array(25).fill(card);
    const component = renderIntoDocument(
      <Cards cards={cards} />  
    );

    const cardsDOM = findRenderedDOMComponentWithClass(component, "cards");
    const cardDOMs = scryRenderedDOMComponentsWithClass(component, "card");
    expect(cardDOMs.length).to.equal(25);
    expect(cardDOMs[0].className).to.equal("card red");
  });

});
