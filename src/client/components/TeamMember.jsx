import React from 'react';

/**
 * {
 *   username: 'bob',
 *   currentUser: 'adam'
 * }
 */
export default React.createClass({
  render: function() {
    return <div className="teamMember">
             {
               this.props.currentUser === this.props.username ?
                 <strong>{this.props.username}</strong> :
                 this.props.username
             }
           </div>;
  }
});
