import React from 'react';
import { shallow } from 'enzyme';
import RadioGroup from '../../components/FormElements/RadioGroup';
import renderer from 'react-test-renderer';

const formData = require( '../../config/data' ).radioFiatFields;

let wrapped;
const component = <RadioGroup fiatName="USD" handleChangeFiat={() => {}} formData={formData} />;

beforeEach(() => {
  wrapped = shallow( component );
});

describe( 'RadioGroup component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();

    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "handleChangeFiat" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'handleChangeFiat' );
    expect( typeof wrapped.props().handleChangeFiat ).toEqual( 'function' );
  });

  it( 'should have a "fiatName" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'fiatName' );
    expect( wrapped.props().fiatName ).toEqual( 'USD' );
  });

  it( 'should have a "formData" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'formData' );
    expect( wrapped.props().formData.length ).toBeGreaterThanOrEqual( 2 );
  });
});
