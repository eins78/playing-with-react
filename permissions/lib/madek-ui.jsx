/**
 * @jsx React.DOM
 */
var React = require('react');
 
module.exports = {
  Layout: require('./ui-layout.jsx'),
  List: React.createClass({
    // A list view.
    // Mods: ["inline"]
    
    render: function () {
      // mod/config classes
      var props = this.props;
      var classes = [];
      ['mod'].forEach(function (c) {
        if (props[c]) {
          classes.push(props[c]);
        }
      });
      // build list
      var list = this.props.data.map(function (item) {
        return (
          <li key={'item-'+item}>{item}</li>
        );
      });
      // build component
      return (
        <ul className={classes.join(' ')}>
          {list}
        </ul>
      );
    }
  })
};