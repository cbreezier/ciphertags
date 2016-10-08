import React from 'react';

/*
 * {
 *       word: 'rat',
 *       team: 'red|blue|assassin|civilian',
 *       revealed: true|false
 * }
 */
export default React.createClass({
  render: function() {
		var classes = "card ";
		if (this.props.revealed === true) {
			classes = classes + this.props.team;
		}
    return <div className={classes}>
             <div className='cardInner'>
               {this.props.word}
             </div>
           </div>;
  }
});
