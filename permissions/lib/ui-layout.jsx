/**
 * @jsx React.DOM
 */
var React = require('react');

// # Layout
module.exports = {
  
  // ## Separator
  Separator: React.createClass({
    render: function () {
      var classes = ['separator'];
      var props = this.props;
      // defaults
      props.spacing = props.spacing || "mvl";
      ['mod', 'spacing'].forEach(function (c) {
        if (props[c]) {
          classes.push(props[c]);
        }
      });
      
      return (
        <hr className={classes.join(' ')} />
      )
    }
  })
};