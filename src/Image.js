import React, { Component } from 'react';

class Image extends Component {
  constructor(props) {
    super(props);

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleImageReview = this.handleImageReview.bind(this);
  }

  handleImageLoad(e) {
    
    this.props.handleImageLoad(this.props.index, e.target.width, e.target.height, true);
  }

  handleImageReview(e) {
    e.preventDefault();
    this.props.handleImageReview(this.props.reviewURL, this.props.imageData);
  }

  render() {
    let height = this.props.height ? this.props.height : "",
        width = this.props.width ? this.props.width : "",
        display = this.props.isVisible ? "block" : "none";

    return (
      <div className="img-box" style={{display}}>
        <a href={this.props.reviewURL} onClick={this.handleImageReview} className="img-ref">
          <img 
            style={{
              height,
              width
            }}
            className="img" 
            src={this.props.url}
            alt={this.props.tags}
            onLoad={this.handleImageLoad} />
        </a>
      </div>
    );
  }
}

export default Image;