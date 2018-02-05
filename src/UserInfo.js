import React, { Component } from 'react';

class UserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageIsLoaded: false
    };

    this.imageURL = props.userImageURL;

    this.handleImageLoad = this.handleImageLoad.bind(this);
  }

  handleImageLoad() {
    // console.log('handle image');
    this.setState({
      imageIsLoaded: true
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.userImageURL !== this.imageURL) {
      this.imageURL = nextProps.userImageURL;
    // console.log('will recieve porps');

      this.setState((prevState) => {
        return {imageIsLoaded: false};
      });
    }
  }

  render() {

    let visibility = this.state.imageIsLoaded ? "visible" : "hidden";

    return (
      <div className="user-info">
        <img 
          className="user-image"
          style={{visibility}} 
          src={this.props.userImageURL} 
          alt={this.props.userName}
          onLoad={this.handleImageLoad}/>
        <span className="user-name">{this.props.userName}</span>
      </div>
    )
  }
}

export default UserInfo;