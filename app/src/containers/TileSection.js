import React, { PureComponent, Fragment } from 'react';
import Tile from '../components/Tile';
import Info from '../components/Info';

export default class TileSection extends PureComponent {
  constructor( props ) {
    super( props );
    this.tileRenderer = this.tileRenderer.bind( this );
  }

  tileRenderer() {
    return this.props.cryptoTiles.map(( tile, key ) => (
      <Fragment key={key}>
        <Tile position={key} {...tile} />
      </Fragment>
    ));
  }

  render() {
    let componentToRender = null;

    if ( this.props.cryptoTiles.length === 0 ) {
      const props = {
        text: 'No crypto saved',
        type: 'info'
      };

      componentToRender = <Info {...props} />;
    } else {
      componentToRender = this.tileRenderer();
    }
    return (
      <div>
        {componentToRender}
      </div>
    );
  }
}
