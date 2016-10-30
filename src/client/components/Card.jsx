import React from 'react';

/*
 * {
 *       index: 3,
 *       word: 'rat',
 *       team: 'red|blue|assassin|civilian',
 *       revealed: true|false,
 *
 *       sendToServer: function(message)
 * }
 */
export default React.createClass({
  revealCard: function(index) {
    this.props.sendToServer({
      type: 'REVEAL_CARD',
      index: index
    });
  },
  render: function() {
    var classes = "card ";
    if (this.props.revealed === true) {
      classes = classes + this.props.team;
    }
    return <div className={classes} onClick={this.revealCard.bind(this, this.props.index)}>
             <div className='cardInner'>
               {this.props.word}
             </div>
           </div>;
  }
});
