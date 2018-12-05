import React from 'react';
import { Link } from 'react-router-dom';

function VideoItems(props) {
  return (
    <div className="video">
      {props.search.map(
          item =>
          <Link className="results__item_video"
            to={'/video/' + item.get('id')}
            key={item.get('id')}
            item-id={item.get('id')}
            onClick={props.handleClick}>
            {item.get('author')} , {item.get('title')}
          </Link>
      )}
    </div>
  )
}

export default VideoItems;
