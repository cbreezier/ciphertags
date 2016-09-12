import React from 'react';

import Card from './Card';

export default React.createClass({
  render: function() {
    let cards = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push({
          key: j,
          word: this.props.cards[i*5 + j]
        });
      }
      cards.push({
        key: i,
        cards: row
      });
    }
    return <div className="cards">
             {cards.map(row =>
               <div key={row.key} className="row">
                 {row.cards.map(card =>
                   <Card key={card.key} word={card.word}/>
                 )}
               </div>
             )}
           </div>;
  }
});
