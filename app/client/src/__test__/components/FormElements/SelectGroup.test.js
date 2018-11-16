import React from 'react';
import renderer from 'react-test-renderer';
import { createMount } from '@material-ui/core/test-utils';
import SelectGroup from '../../../components/FormElements/SelectGroup';
import mockData from '../../mockData';

let mounted;
const options = mockData.selectOptions;
const component = <SelectGroup
  options={options}
  isFormSubmited={false}
  handleChangeExchange={jest.fn()}
  classes={{}}
/>;

const withStyles = createMount({ dive: true });

beforeEach(() => {
  mounted = withStyles( component );
});

describe( 'SelectGroup component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();
    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "options" prop', () => {
    expect( mounted.props()).toHaveProperty( 'options' );
    expect( mounted.props().options ).toEqual( options );
  });

  it( 'should have a "isFormSubmited" prop', () => {
    expect( mounted.props()).toHaveProperty( 'isFormSubmited' );
    expect( mounted.props().isFormSubmited ).toBeFalsy();
  });

  it( 'should have a "dataExchanges" state with "props.options" as array', () => {
    expect( mounted.state()).toHaveProperty( 'dataExchanges' );
    expect( mounted.state().dataExchanges ).toEqual(['Coinbase', 'Binance']);
  });

  it( 'should have 1 "Select" component by default', () => {
    expect( mounted.find( 'SelectWrapper' )).toHaveLength( 1 );
  });

  it( 'should have 2 "Select" components after the "selectedExchange" has been selected', () => {
    mockData.selectGroupSetState( mounted, 1 );

    mounted.update();

    expect( mounted.find( 'SelectWrapper' )).toHaveLength( 2 );
    expect( mounted.state().dataCryptos ).toEqual(['ETH', 'BTC']);
  });

  it( 'should have 3 "Select" components after the "selectedCrypto" has been selected', () => {
    mockData.selectGroupSetState( mounted, 2 );

    mounted.update();


    expect( mounted.find( 'SelectWrapper' )).toHaveLength( 3 );
    expect( mounted.state().dataPairs ).toEqual(['USD', 'BTC', 'EUR', 'GBP']);
  });

  it( 'should have 3 state values set after "dataPairs" is set', () => {
    mockData.selectGroupSetState( mounted, 3 );

    mounted.update();


    expect( mounted.state().selectedPair ).toEqual( 'USD' );
  });

  it( 'should call "handleChangeExchange" after all 3 Selects have values', () => {
    mockData.selectGroupSetState( mounted, 3 );

    const expectedArgs = {
      selectedExchange: 'Coinbase',
      selectedCrypto: 'ETH',
      selectedPair: 'USD'
    };


    expect( mounted.props().handleChangeExchange ).toHaveBeenCalled();
    expect( mounted.props().handleChangeExchange ).toHaveBeenCalledWith( expectedArgs );
  });

  it( 'should reset the state if the form is submitted', () => {
    mounted.setProps({ isFormSubmited: true });
    const expectedArgs = {
      options,
      dataExchanges: ['Coinbase', 'Binance'],
      selectedExchange: '',
      selectedCrypto: '',
      selectedPair: '',
      dataCryptos: null,
      dataPairs: null
    };

    expect( mounted.state()).toEqual( expectedArgs );
  });
});
