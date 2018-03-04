import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';
import Tile from '../components/Tile';
import Info from '../components/Info';
// import * as actions from '../redux/actions';
import * as thunks from '../redux/thunks';

const getInfoProps = ( text, type ) => ({ text, type });

class TileSection extends PureComponent {
  componentDidMount() {
    this.props.dispatch(
      thunks.fetchApiData( 'api/crypto' )
    )
      .then(() => {
        this.forceUpdate();
      });
  }

  tileRenderer( apiData ) {
    return apiData.map(( tile, key ) => (
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
      componentToRender = this.tileRenderer( apiData.data );
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
