import React, { Component } from 'react';

// require('bootstrap');



class Navbar extends Component {

  render() {



    return (
      <div className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavContent" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Navbar;
