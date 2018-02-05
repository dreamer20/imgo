import React, { Component } from 'react';
// import logo from './logo.svg';
// require('bootstrap');

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.props.handleChange(this.props.paramName, value);
  }

  render() {

    let items = [],
        className;

    for (let item in this.props.items) {
      if (!this.props.items.hasOwnProperty(item)) continue;
      className = this.props.val === item ? "dropdown-item checked" : "dropdown-item";

      items.push(<button 
                  onClick={this.handleChange.bind(this, item)} 
                  key={this.props.items[item]}
                  className={className}>{this.props.items[item]}</button>);
    }

    return (
      <div className="dropdown-menu">
        {items}
      </div>
    );
  }
}

export default Dropdown;
