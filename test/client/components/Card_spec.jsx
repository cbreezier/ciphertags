import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import {expect} from 'chai';
import Card from '../../../src/client/components/Card';

describe('Card', () => {
  it('renders a word', () => {
    const component = renderIntoDocument(
      <Card word={"rat"}
            team={"red"}
            revealed={false} />  
    );
    const card = findRenderedDOMComponentWithClass(component, "card");

    expect(card).to.be.ok;
    expect(card.textContent).to.equal('rat');
  });

  it('does not render the team if card is not revealed', () => {
    const component = renderIntoDocument(
      <Card word={"rat"}
            team={"blue"}
            revealed={false} />  
    );
    const card = findRenderedDOMComponentWithClass(component, "card");

    expect(card).to.be.ok;
    expect(card.className).to.equal('card ');
  });

  it('renders the team if the card is revealed', () => {
    const component = renderIntoDocument(
      <Card word={"rat"}
            team={"blue"}
            revealed={true} />  
    );
    const card = findRenderedDOMComponentWithClass(component, "card");

    expect(card).to.be.ok;
    expect(card.className).to.equal('card blue');
  });
});
