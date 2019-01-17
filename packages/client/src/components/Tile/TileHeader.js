import React from 'react';
import { CardHeader, Button, Avatar } from '@material-ui/core';

const TileHedaer = ({
  name, onClickRemoveItem, onClickEditItem, isOpen
}) => {
  const editBtnText = isOpen ? 'Close' : 'Edit';
  const imgSrc = `./icon/${name}.svg`;
  const loadDefaultImage = ( e ) => {
    e.target.src = './icon/default.svg';
  };

  return (
    <React.Fragment>
      <CardHeader
        avatar={
          <Avatar
            src={imgSrc}
            alt={`crypto icon for ${name}`}
            onError={img => loadDefaultImage( img )}
          />
        }
        title={name}
        action={
          <React.Fragment>
            <Button
              variant="contained"
              onClick={onClickRemoveItem}
              color="secondary"
            >
              Remove
            </Button>
            <Button
              variant="contained"
              onClick={onClickEditItem}
              color="primary"
            >
              {editBtnText}
            </Button>
          </React.Fragment>
        }
      />

    </React.Fragment>
  );
};

export default TileHedaer;
