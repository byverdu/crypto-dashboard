import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import Tile from '../components/Tile';
import Info from '../components/Info';

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
    });

    this.props.dispatch(
      thunks.fetchApiData( '/api/crypto' )
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
        <Tile position={key} {...tile} />
      </Fragment>
    ));
  }

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
