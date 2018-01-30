import React, { PureComponent, Fragment } from 'react';
import Tile from '../components/Tile';

export default class TileSection extends PureComponent {
  constructor( props ) {
    super( props );
    this.tileRenderer = this.tileRenderer.bind( this );
  }

  tileRenderer() {
    return this.props.cryptoTiles.map(( tile, key ) => (
      <Fragment key={key}>
        <Tile {...tile} />
      </Fragment>
    ));
  }

  render() {
    return (
      <div>
        {this.tileRenderer()}
      </div>
    );
  }
}
