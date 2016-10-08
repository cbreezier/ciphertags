import React from 'react';

import Cards from './Cards';
import TeamList from './TeamList';

export default React.createClass({
  render: function() {
    return <div id="game">
             <Cards cards={this.props.cards}/>
             <TeamList mastermind='jane' teamMembers={['bob', 'john']}/>
           </div>;
  }
});
