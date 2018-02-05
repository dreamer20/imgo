import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleChangeInput(e) {
    this.props.handleChange(this.props.paramName, e.target.value)
  }

  handleSearchSubmit(e) {
    e.preventDefault();
    this.props.handleSearch();
  }

  render() {

    return (
      <form className="form-inline mt-2">
        <input 
          type="search" 
          className="form-control mr-2 mb-2" 
          value={this.props.val}
          placeholder="Поиск"
          aria-label="Поиск"
          onChange={this.handleChangeInput}/>
        <button className="btn btn-outline-light mb-2" onClick={this.handleSearchSubmit}>Поиск</button>
      </form>
    );
  }
}

export default Search;