import React, { PureComponent, Fragment } from 'react';
import axios from 'axios';
import Tile from '../components/Tile';
import Info from '../components/Info';

export default class TileSection extends PureComponent {
  constructor( props ) {
    super( props );
    this.tileRenderer = this.tileRenderer.bind( this );
    // Bind the this context to the handler function
    this.onClickRemoveItem = this.onClickRemoveItem.bind( this );

    // Set some state
    this.state = {
      tiles: []
    };
  }

  componentDidMount() {
    axios.get( 'api/crypto' )
      .then(( response ) => {
        this.setState({
          tiles: response.data
        });
      });
  }

  tileRenderer() {
    return this.state.tiles.map(( tile, key ) => (
      <Fragment key={key}>
        <Tile action={this.onClickRemoveItem} position={key} {...tile} />
      </Fragment>
    ));
  }

  onClickRemoveItem() {
    axios({
      method: 'post',
      url: '/api/crypto',
      data: {
        cryptoToRemove: this.props.position
      }
    })
      .then(( response ) => {
        console.log( response );
        this.setState({
          tiles: response.data
        });
      })
      .catch(( error ) => {
        console.log( error );
      });
  }

  render() {
    let componentToRender = null;

    if ( this.state.tiles.length === 0 ) {
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
