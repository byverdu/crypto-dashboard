import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as thunks from '../redux/thunks';
import Tile from '../components/Tile';
import Info from '../components/Info';

class TileSection extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      cryptos: []
    };

    this.showInfoComponent = true;
  }

  componentDidMount() {
    this.props.store.subscribe(() => {
      const cryptos = this.props.store.getState().api.data;
      this.showInfoComponent = false;
      this.setState({
        cryptos
      }, () => { this.showInfoComponent = true; });
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
    const infoType = apiData.status === 200 ? 'info' : 'danger';

    return (
      <Fragment>
        {this.showInfoComponent &&
          <Info fade text={apiData.message} type={infoType} />
        }
        {this.tileRenderer()}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  apiData: state.api
});

export default connect( mapStateToProps )( TileSection );
