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
    return <div className="card" class="{this.props.team}">
             {this.props.word}
           </div>;
  }
});
