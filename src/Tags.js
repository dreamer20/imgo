import React, { Component } from 'react';

class Tags extends Component {

  render() {

    let tags = this.props.tagsString.split(",");

    tags = tags.map((text, index) => {
      return <span key={index} className="badge badge-light mr-2">{text.trim()}</span>
    });

    return (
        <div className="tags">
          {tags}
        </div>
      );
  }
}

export default Tags;