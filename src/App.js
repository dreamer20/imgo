import React, { Component } from 'react';
import update from 'immutability-helper'
import './style.css';
import $ from "jquery";
import "popper.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap";
import Navbar from "./Navbar";
import Search from './Search';
import NavbarNav from './NavbarNav';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';
import Image from './Image';
import Loader from './Loader';
import ImgReview from './ImgReview';

let dropdownTitles = ['Порядок','Тип', 'Ориентация', 'Катигория'],
    order = {
      "popular": 'Популярное',
      "latest": 'Последнее',
    },
    imageType = {
      "all": 'Все',
      "photo": 'Фотографии',
      "illustration": 'Илюстрации',
      "vector": 'Векторная графика'
    },
    orientation = {
      "all": 'Любая',
      "horizontal": 'Горизонтальная',
      "vertical": 'Вертикальная'
    },
    category = {
      "all": "Все",
      "nature": 'Природа',
      "animals": 'Животные',
      "music": 'Музыка',
      "sports": 'Спорт',
      "travel": 'Путешетвия',
      "business": 'Бизнес',
      "religion": 'Религия',
      "science": 'Наука',
      "places": 'Места',
      "buildings": 'Строения',
      "transportation": 'Транспорт'
    }
class App extends Component {
  constructor(props) {
    super(props);

    this.loadedImagesCount = 0;
    this.imagesProps = [];
    this.minHeight = $(window).height();
    this.state = {
      requestParams: {
        key: "7775574-3025f5a4e25df18f8739c96bc",
        q: "",
        image_type: "all",
        orientation: "all",
        category: "all",
        safesearch: false,
        page: 1,
        order: "popular",
        per_page: 20
      },
      requestedImages: [],
      imagesLoaded: false,
      isReadySendRequest: true,
      isReviewOpened: false,
      imageReview: {
        url: null,
        imageData: null
      }
    }

    this.sendRequest = this.sendRequest.bind(this);
    this.setRequestParam = this.setRequestParam.bind(this);
    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
    this.handleImageReview = this.handleImageReview.bind(this);
    this.handleReviewClosing = this.handleReviewClosing.bind(this);
  }

  sendRequest() {
    this.setState({isReadySendRequest: false});
    $.get('https://pixabay.com/api/', this.state.requestParams)
      .done(data => {
        this.setState((prevState) => {
            let updatedState = update(prevState, {
            requestedImages: {$push: data.hits}
          });            
          return updatedState;
          
        });
      })
      .fail(error => alert(error));
  }

  setRequestParam(param, value) {
    this.setState((prevState) => {
      let updatedState = update(prevState, {
        requestParams: {[param]: {$set: value}}});
      return updatedState;
    })
  }

  componentDidMount() {
    this.sendRequest();
    this.containerWidth = $('body').innerWidth();

    $(window).resize(() => {
      this.containerWidth = $('body').innerWidth();
      this.handleContainerResize();
    })
    .scroll(() => {

      if ($(window).scrollTop() >= ($('body').height() - $(window).height()*2 ) && this.state.isReadySendRequest) {

        this.setState((prevState) => {
          let nextPage = prevState.requestParams.page + 1;
          let updatedState = update(prevState, {
            requestParams: {page: {$set: nextPage}}
          });

          return updatedState;
        });

        this.sendRequest();
      }
    });
    this.loadedImagesCount = 0;
  }

  handleRequest() {
    this.imagesProps = [];
    this.setState((prevState) => {
      let updatedState = update(prevState, {
        requestedImages: {$set: []},
        requestParams: {page: {$set: 1}}
      });
      return updatedState;
    }, this.sendRequest);

    if (this.containerWidth < 992) {
      $(".navbar-toggler").trigger("click");
    }
  }

  calculateImageProps(images) {
    let sumOfImgWidth = 0,
        imgRow = [],
        calculatedImages = [],
        ratio,
        sumOfImgRatio,
        calculatedWidth,
        rest = 0,
        calculatedHeight,
        bodyWidth = this.containerWidth;

    for (let i = 0; i < images.length; i++) {
      imgRow.push(images[i]);
      sumOfImgWidth += images[i].originalWidth;

      if (sumOfImgWidth > bodyWidth) {
        for (let j = 0; j < imgRow.length; j++) {
          ratio = imgRow[j].originalWidth / imgRow[j].originalHeight;
          sumOfImgRatio = sumOfImgWidth / 340;
          calculatedHeight = bodyWidth / sumOfImgRatio;
          calculatedWidth = calculatedHeight * ratio;
          rest += parseFloat("0." + calculatedWidth.toString().split(".")[1]);
          calculatedWidth = Math.floor(calculatedWidth);

          if (j === imgRow.length-1) {
            rest = +rest.toFixed();
            calculatedWidth += rest;
            rest = 0; 
          }
          calculatedImages.push({calculatedHeight, calculatedWidth, isVisible: true});
        }
        imgRow = [];
        sumOfImgWidth = 0;
      }
    }
    imgRow.forEach((image) => {
      calculatedImages.push({calculatedWidth: "", calculatedHeight: "", isVisible: true});
    });
    return calculatedImages;
  }

  handleContainerResize() {
    this.calculatedImagesProps = this.calculateImageProps(this.imagesProps);
    this.setState((prevState) => {
      let updatedState = update(prevState, {
        requestedImages: {0: {$merge: this.calculatedImagesProps[0]}}
      });

      for (let i = 1; i < prevState.requestedImages.length; i++) {
        updatedState = update(updatedState, {requestedImages: {[i]: {$merge: this.calculatedImagesProps[i]}}});
      }
      return updatedState;
    });
  }

  handleImageLoad(index, originalWidth, originalHeight, isVisible) {
    this.imagesProps[index] = {originalWidth, originalHeight, isVisible};

    if (++this.loadedImagesCount === this.state.requestParams.per_page) {
      
      this.calculatedImagesProps = this.calculateImageProps(this.imagesProps);
      this.setState((prevState) => {
        let updatedState = update(prevState, {
          requestedImages: {0: {$merge: this.calculatedImagesProps[0]}},
          isReadySendRequest: {$set: true}
        });

        for (let i = 1; i < prevState.requestedImages.length; i++) {
          updatedState = update(updatedState, {requestedImages: {[i]: {$merge: this.calculatedImagesProps[i]}}});
        }
        return updatedState;
      });
      this.loadedImagesCount = 0;
    }
  }

  handleImageReview(url, imageData) {
    this.setState({
      isReviewOpened: true,
      imageReview: {url, imageData}
    });
  }

  handleReviewClosing() {
    this.setState({isReviewOpened: false});
  }

  render() {
    let images = [];

        for (let i = 0; i < this.state.requestedImages.length; i++) {
          let url = this.state.requestedImages[i].webformatURL.replace("_640","_340"),
              reviewURL =  this.state.requestedImages[i].webformatURL.replace("_640","_960");
          if (this.state.requestedImages[i].isVisible) {
            images.push(<Image 
                          index={i}
                          isVisible={true}
                          reviewURL={reviewURL}
                          imageData={this.state.requestedImages[i]}
                          key={this.state.requestedImages.id}
                          width={this.state.requestedImages[i].calculatedWidth}
                          height={this.state.requestedImages[i].calculatedHeight}
                          handleImageLoad={this.handleImageLoad}
                          handleImageReview={this.handleImageReview}
                          alt={this.state.requestedImages[i].tags}
                          url={url}/>);            
          } else {
            images.push(<Image 
                          index={i} 
                          key={this.state.requestedImages.id}
                          handleImageLoad={this.handleImageLoad} 
                          url={url}/>);            
          }
        }

    return (
      <React.Fragment>
        <Navbar>
          <NavbarNav dropdownTitles={dropdownTitles}>
            <Dropdown 
              handleChange={this.setRequestParam} 
              paramName="order" 
              items={order}
              val={this.state.requestParams.order}/>
            <Dropdown 
              handleChange={this.setRequestParam} 
              paramName="image_type" 
              items={imageType}
              val={this.state.requestParams.image_type}/>
            <Dropdown 
              handleChange={this.setRequestParam} 
              paramName="orientation" 
              items={orientation}
              val={this.state.requestParams.orientation}/>
            <Dropdown 
              handleChange={this.setRequestParam} 
              paramName="category" 
              items={category}
              val={this.state.requestParams.category}/>
          </NavbarNav>
          <Checkbox 
            val={this.state.requestParams.safesearch}
            paramName="safesearch"
            text="Безопасный поиск" 
            hint="Не показывать изображения превышающие возрастное ограничение" 
            _id="safeCheckbox"
            handleChange={this.setRequestParam}/>
          <Search 
            val={this.state.requestParams.q}
            paramName="q"
            handleChange={this.setRequestParam} 
            handleSearch={this.handleRequest}/>
        </Navbar>
        <div 
          className="img-container clearfix" 
          style={{minHeight: this.minHeight}} >

          {images}
          
          <Loader isVisible={!this.state.isReadySendRequest}/>
        </div>
        <ImgReview 
          url={this.state.imageReview.url}
          imageData={this.state.imageReview.imageData}
          handleReviewClosing={this.handleReviewClosing} 
          isVisible={this.state.isReviewOpened} />
        </React.Fragment>
    );
  }
}

export default App;
