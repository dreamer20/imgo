import React, { Component } from 'react';

import UserInfo from './UserInfo'
import Tags from './Tags'

class ImgReview extends Component {
  constructor(props) {
    super(props);

    this.handleReviewClosing = this.handleReviewClosing.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);

    this.imageURL = props.url;

    this.state = {
      imageIsLoaded: false
    };
  }

  handleReviewClosing() {
    this.props.handleReviewClosing();
  }

  handleImageLoad() {
    this.setState({
      imageIsLoaded: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url !== this.imageURL) {
      this.imageURL = nextProps.url;
      this.setState({
        imageIsLoaded: false
      });
    }
  }

  render() {

    let isVisible = this.props.isVisible ? "block" : "none",
        display = this.state.imageIsLoaded ? "block" : "none",
        userInfo,
        tags,
        resolution,
        link;

    if (this.props.imageData) {
      userInfo = <UserInfo 
                    userImageURL={this.props.imageData.userImageURL}
                    userName={this.props.imageData.user} />;

      tags = <Tags tagsString={this.props.imageData.tags} />

      resolution = <span className="resolution">{`${this.props.imageData.imageWidth} × ${this.props.imageData.imageHeight}`}</span>

      link = <a target="_blank" className="btn btn-outline-light" href={this.props.imageData.pageURL}>Открыть на pixabay.com</a>
    }

    return (
      <div className="img-review" style={{display: isVisible}} >
        <div className="img-review-body">
          <button type="button" className="img-review-close-btn" onClick={this.handleReviewClosing}>
            <span aria-hidden="true">&times;</span>
          </button>
          <div className="img-view">
            <img 
              src={this.props.url} 
              style={{display}}
              alt={this.props.tags}
              className="review-image img-fluid" 
              onLoad={this.handleImageLoad}/>
          </div>
          <div className="img-info">
            <div className="container-fluid">      
              <div className="row mb-3">
                <div className="col-md-12">
                  <h5 className="img-info-row-title">Пользователь:</h5>
                  {userInfo}
                </div>
              </div>        
              <div className="row mb-3">
                <div className="col-md-12">
                  <h5 className="img-info-row-title">Теги:</h5>
                  {tags}
                </div>
              </div>        
              <div className="row mb-3">
                <div className="col-md-12">
                  <h5 className="img-info-row-title">Разрешение:</h5>
                  {resolution}
                </div>
              </div>        
              <div className="row pb-3">
                <div className="col-md-12">
                  {link}
                </div>
              </div>        
            </div>
          </div> 
        </div>
      </div>
    )
  }
}

export default ImgReview;