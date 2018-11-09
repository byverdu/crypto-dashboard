import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Select from './Select';

export default class SelectGroup extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      options: props.options,
      selectedExchange: '',
      selectedCrypto: '',
      selectedPair: '',
      dataExchanges: Object.keys( props.options ),
      dataCryptos: null,
      dataPairs: null
    };

    this.handleChangeExchange = this.handleChangeExchange.bind( this );
    this.handleChangeCrypto = this.handleChangeCrypto.bind( this );
    this.handleChangePair = this.handleChangePair.bind( this );
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.isFormSubmited ) {
      this.setState({
        selectedExchange: '',
        selectedCrypto: '',
        selectedPair: '',
        dataCryptos: null,
        dataPairs: null
      });
    }
  }

  handleChangeExchange( event ) {
    const selectedExchange = event.target.value;
    const dataCryptos = Object.keys( this.state.options[ selectedExchange ]);
    this.setState({
      selectedExchange,
      dataCryptos
    });
  }

  handleChangeCrypto( event ) {
    const selectedCrypto = event.target.value;
    const dataPairs = this.state.options[ this.state.selectedExchange ][ selectedCrypto ];

    this.setState({
      selectedCrypto,
      dataPairs
    });
  }

  handleChangePair( event ) {
    const selectedPair = event.target.value;
    const { selectedCrypto, selectedExchange } = this.state;

    this.props.handleChangeExchange({
      selectedExchange,
      selectedCrypto,
      selectedPair
    });

    this.setState({
      selectedPair
    });
  }

  render() {
    const {
      dataExchanges,
      dataCryptos,
      dataPairs,
      selectedExchange,
      selectedCrypto,
      selectedPair
    } = this.state;

    return (
      <Fragment>
        <Select
          options={dataExchanges}
          label="Exchange"
          handleChange={this.handleChangeExchange}
          value={selectedExchange}
        />

        {this.state.dataCryptos && <Select
          options={dataCryptos}
          label="Coin"
          handleChange={this.handleChangeCrypto}
          value={selectedCrypto}
        />}

        {this.state.dataPairs && <Select
          options={dataPairs}
          label="Pair"
          handleChange={this.handleChangePair}
          value={selectedPair}
        />}
      </Fragment>
    );
  }
}

SelectGroup.propTypes = {
  options: PropTypes.object.isRequired,
  isFormSubmited: PropTypes.bool.isRequired,
  handleChangeExchange: PropTypes.func.isRequired
};
