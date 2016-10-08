import React from 'react';

import Card from './Card';

export default React.createClass({
  render: function() {
    let cards = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        let curr_card = this.props.cards[i * 5 + j];
        row.push({
          key: j,
          word: curr_card.word,
          team: curr_card.team,
          revealed: curr_card.revealed
        });
      }
      cards.push({
        key: i,
        cards: row
      });
    }
    return <div className='cards'>
             {cards.map(row =>
               <div key={row.key} className='cardRow'>
                 {row.cards.map(card =>
                   <Card key={card.key}
                         word={card.word}
                         team={card.team}
                         revealed={card.revealed}/>
                 )}
               </div>
             )}
           </div>;
  }
});
