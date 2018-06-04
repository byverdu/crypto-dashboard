import React from 'react';
import { CardHeader, Button } from 'reactstrap';

const TileHedaer = ({
  name, onClickRemoveItem, onClickEditItem, isOpen
}) => {
  const editBtnText = isOpen ? 'Close' : 'Edit';
  const imgSrc = `./icon/${name}.svg`;
  const loadDefaultImage = ( e ) => {
    e.target.src = './icon/default.svg';
  };

  return (
    <CardHeader tag="h3">
      {name}
      <img
        alt={`crypto icon for ${name}`}
        src={imgSrc}
        onError={img => loadDefaultImage( img )}
      />
      <Button onClick={onClickRemoveItem} color="danger">Remove</Button>
      <Button onClick={onClickEditItem} color="info">{editBtnText}</Button>
    </CardHeader>
  );
};

export default TileHedaer;
