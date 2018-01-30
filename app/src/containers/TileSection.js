import React, { PureComponent, Fragment } from 'react';
import Tile from '../components/Tile';

const loadingRenderer = () =>
 <div>
  Loading ...
</div>;

export default class TileSection extends PureComponent {
  constructor( props ) {
    super( props );
    this.tileRenderer = this.tileRenderer.bind( this );
  }

  get cryptoTiles() {
    return this.props.cryptoTiles;
  }

  tileRenderer() {
    return this.cryptoTiles.map(( tile, key ) => (
      <Fragment key={key}>
        <Tile {...tile} />
      </Fragment>
    ));
  }

  render() {
    let componentToRender = null;

    if ( this.cryptoTiles.length === 0 ) {
      componentToRender = loadingRenderer();
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
