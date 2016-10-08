import React from 'react';

/**
 * {
 *   username: 'bob'
 * }
 */
export default React.createClass({
  render: function() {
    return <div className="teamMember">
             {this.props.username}
           </div>;
  }
});
