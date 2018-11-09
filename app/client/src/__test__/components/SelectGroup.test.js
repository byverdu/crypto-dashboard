import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import SelectGroup from '../../components/FormElements/SelectGroup';
import mockData from '../mockData';


let mounted;
let wrapped;
const options = mockData.selectOptions;
const component = <SelectGroup
  options={options}
  isFormSubmited={false}
  handleChangeExchange={jest.fn()}
/>;

beforeEach(() => {
  mounted = mount( component );
  wrapped = shallow( component );
});

describe( 'Info component', () => {
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
    expect( wrapped.state()).toHaveProperty( 'dataExchanges' );
    expect( wrapped.state().dataExchanges ).toEqual(['Coinbase', 'Binance']);
  });

  it( 'should have 1 "Select" component by default', () => {
    expect( wrapped.find( 'Select' )).toHaveLength( 1 );
  });

  it( 'should have 2 "Select" components after the "selectedExchange" has been selected', () => {
    mockData.selectGroupSetState( wrapped, 1 );

    expect( wrapped.find( 'Select' )).toHaveLength( 2 );
    expect( wrapped.state().dataCryptos ).toEqual(['ETH', 'BTC']);
  });

  it( 'should have 3 "Select" components after the "selectedCrypto" has been selected', () => {
    mockData.selectGroupSetState( wrapped, 2 );

    expect( wrapped.find( 'Select' )).toHaveLength( 3 );
    expect( wrapped.state().dataPairs ).toEqual(['USD', 'BTC', 'EUR', 'GBP']);
  });

  it( 'should have 3 state values set after "dataPairs" is set', () => {
    mockData.selectGroupSetState( wrapped, 3 );

    expect( wrapped.state().selectedPair ).toEqual( 'USD' );
  });

  it( 'should call "handleChangeExchange" after all 3 Selects have values', () => {
    mockData.selectGroupSetState( wrapped, 3 );

    const expectedArgs = {
      selectedExchange: 'Coinbase',
      selectedCrypto: 'ETH',
      selectedPair: 'USD'
    };

    expect( mounted.props().handleChangeExchange ).toHaveBeenCalled();
    expect( mounted.props().handleChangeExchange ).toHaveBeenCalledWith( expectedArgs );
  });
});
