import React, {Component} from 'react';

class Checkbox extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleChange(this.props.paramName, e.target.checked);
  }


  render() {
    return (
      <div className="custom-control custom-checkbox mr-2">
        <input onChange={this.handleChange} checked={this.props.val} type="checkbox" className="custom-control-input" id={this.props._id}/>
        <label className="custom-control-label text-light" title={this.props.hint} htmlFor={this.props._id}>{this.props.text}</label>
      </div>
      );
  }
}

export default Checkbox;