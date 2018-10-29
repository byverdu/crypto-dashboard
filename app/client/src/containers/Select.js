import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { SelectWrapper } from '../components';

const getSelectWrapperData = data => data.map( item => ({ value: item, label: item }));

export default class SelectContainer extends React.Component {
  static defaultSelectValues() {
    return {
      value: '',
      label: ''
    };
  }

  constructor( props ) {
    super( props );
    this.state = {
      selectData: null,
      selectedExchange: SelectContainer.defaultSelectValues(),
      selectedCrypto: SelectContainer.defaultSelectValues(),
      selectedPair: SelectContainer.defaultSelectValues(),
      dataExchanges: [],
      dataCryptos: null,
      dataPairs: null
    };

    this.handleChangeExchange = this.handleChangeExchange.bind( this );
    this.handleChangeCrypto = this.handleChangeCrypto.bind( this );
    this.handleChangePair = this.handleChangePair.bind( this );
  }

  componentWillReceiveProps( newProps ) {
    if ( newProps.selectData ) {
      const dataExchanges = getSelectWrapperData( Object.keys( newProps.selectData ));
      this.setState({ dataExchanges, selectData: newProps.selectData });
    }

    if ( newProps.isFormSubmited ) {
      this.setState({
        selectedExchange: SelectContainer.defaultSelectValues(),
        selectedCrypto: SelectContainer.defaultSelectValues(),
        selectedPair: SelectContainer.defaultSelectValues(),
        dataCryptos: null,
        dataPairs: null
      });
    }
  }

  handleChangeExchange( selectedExchange ) {
    const tempData = this.state.selectData[ selectedExchange.label ];
    const dataCryptos = getSelectWrapperData( Object.keys( tempData ));
    this.setState({
      selectedExchange,
      dataCryptos
    });
  }

  handleChangeCrypto( selectedCrypto ) {
    const tempPair = this.state.selectData[ this.state.selectedExchange.label ][ selectedCrypto.label ];
    const dataPairs = getSelectWrapperData( tempPair );
    this.setState({
      selectedCrypto,
      dataPairs
    });
  }

  handleChangePair( selectedPair ) {
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
        <SelectWrapper
          selectData={dataExchanges}
          name="exchangeCrypto"
          handleChangeSelect={this.handleChangeExchange}
          selectedOption={selectedExchange}
        />

        {this.state.dataCryptos && <SelectWrapper
          selectData={dataCryptos}
          name="coinCrypto"
          handleChangeSelect={this.handleChangeCrypto}
          selectedOption={selectedCrypto}
        />}

        {this.state.dataPairs && <SelectWrapper
          selectData={dataPairs}
          name="pairCrypto"
          handleChangeSelect={this.handleChangePair}
          selectedOption={selectedPair}
        />}
      </Fragment>
    );
  }
}

SelectContainer.propTypes = {
  selectData: PropTypes.object.isRequired,
  isFormSubmited: PropTypes.bool.isRequired
};