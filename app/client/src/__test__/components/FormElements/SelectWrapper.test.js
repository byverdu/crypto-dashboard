import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import SelectWrapper from '../../../components/FormElements/SelectWrapper';

let mounted;
const component = <SelectWrapper
  options={['BTC', 'ETH']}
  label="Coin"
  value=""
  handleChange={jest.fn()}
/>;

beforeEach(() => {
  mounted = mount( component );
});

describe( 'SelectWrapper component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();
    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "options" prop', () => {
    expect( mounted.props()).toHaveProperty( 'options' );
    expect( mounted.props().options ).toEqual(['BTC', 'ETH']);
  });

  it( 'should have a "label" prop', () => {
    expect( mounted.props()).toHaveProperty( 'label' );
    expect( mounted.props().label ).toEqual( 'Coin' );
  });

  it( 'should have a "value" prop', () => {
    expect( mounted.props()).toHaveProperty( 'value' );
    expect( mounted.props().value ).toEqual( '' );
  });

  it( 'should change the select value', () => {
    mounted.find( 'select' ).simulate( 'click' );
    mounted
      .find( 'option' )
      .at( 1 )
      .simulate( 'change', { target: { validity: { valid: true } } });
    mounted.setProps({ value: 'BTC' });

    expect( mounted.props().handleChange ).toHaveBeenCalled();
    expect( mounted.props().value ).toEqual( 'BTC' );
  });
});
