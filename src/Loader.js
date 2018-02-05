import React, { Component } from 'react';

class Loader extends Component {
  
  render() {
    let display = this.props.isVisible ? "block" : "none";
    return (
      <div className="loader" style={{display}}  id="loader-rect-rv2">
        <div className="rect-rv2"></div>
        <div className="rect-rv2"></div>
        <div className="rect-rv2"></div>
        <div className="rect-rv2"></div>
        <div className="rect-rv2"></div>
      </div>
    )
  }
}

export default Loader;