import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Tile from '../components/Tile';
import Info from '../components/Info';
import * as actions from '../redux/actions';

class TileSection extends PureComponent {
  componentDidMount() {
    this.props.dispatch( actions.fetchCryptoTrades( 'api/crypto' ));
  }

  tileRenderer() {
    return this.props.apiData.map(( tile, key ) => (
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

    if ( this.props.apiData.length === 0 ) {
      const props = {
        text: 'No crypto saved',
        type: 'info'
      };

      componentToRender = <Info {...props} />;
    } else {
      componentToRender = this.tileRenderer.call( this );
    }
    return (
      <div>
        {componentToRender}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    apiData: state.api
  }
);

export default connect( mapStateToProps )( TileSection );
