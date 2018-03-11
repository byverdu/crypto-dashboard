import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
// import axios from 'axios';
import Tile from '../components/Tile';
import Info from '../components/Info';
// import * as actions from '../redux/actions';

const getInfoProps = ( text, type ) => ({ text, type });

class TileSection extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      cryptos: []
    };

    this.store = this.props.store;
  }

  componentDidMount() {
    this.store.subscribe(() => {
      const cryptos = this.props.store.getState().api.data;

      this.setState({
        cryptos
      });
      console.log( cryptos, '.getState()' );
    });
    this.props.dispatch(
      thunks.fetchApiData( 'api/crypto' )
    )
      .then(() => {
        const cryptos = this.props.apiData.data;

        this.setState({
          cryptos
        });
      });
  }

  tileRenderer() {
    return this.state.cryptos.map(( tile, key ) => (
      <Fragment key={key}>
        <Tile action={this.onClickRemoveItem} position={key} {...tile} />
      </Fragment>
    ));
  }

  // onClickRemoveItem() {
  //   axios({
  //     method: 'post',
  //     url: '/api/crypto',
  //     data: {
  //       cryptoToRemove: this.props.position
  //     }
  //   })
  //     .then(( response ) => {
  //       console.log( response );
  //       this.setState({
  //         tiles: response.data
  //       });
  //     })
  //     .catch(( error ) => {
  //       console.log( error );
  //     });
  // }

  render() {
    const { apiData } = this.props;
    let componentToRender = null;

    // Adding the Notification banner for empty api data or error in fetch api data
    if ( apiData.status === 200 && apiData.data.length === 0 ) {
      componentToRender = <Info
        {...getInfoProps( 'No crypto saved', 'info' )}
        />;
    } else {
      componentToRender = <Info
        {...getInfoProps( apiData.message, 'danger' )}
        />;
    }

    if ( apiData.data.length > 0 ) {
      componentToRender = this.tileRenderer();
    }

    return (
      <div>
        {componentToRender}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( TileSection );
