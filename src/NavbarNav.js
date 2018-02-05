import React, { Component } from 'react';


class NavbarNav extends Component {

  render() {

    let navItems = this.props.dropdownTitles.map((value, index) => {
      return (<li key={index} className="nav-item dropdown">
        <a href="#"
            
            className="nav-link dropdown-toggle" 
            data-toggle="dropdown">{value}</a>
        {this.props.children[index]}
      </li>);
    });

    return (
      <ul className="navbar-nav mr-auto">
        {navItems}
      </ul>
    );
  }
}

export default NavbarNav;