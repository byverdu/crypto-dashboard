import React from 'react';
import { shallow, mount } from 'enzyme';
import FormRadioGroup from '../../components/FormRadioGroup';
import renderer from 'react-test-renderer';

const formData = require( '../../config/data' ).radioFiatFields;

let wrapped;
let mounted;
const component = <FormRadioGroup fiatName="USD" handleChange={() => {}} formData={formData} />;
const handleChange = jest.fn();

beforeEach(() => {
  wrapped = shallow( component );
  mounted = mount(
    <FormRadioGroup fiatName="USD" handleChange={handleChange} formData={formData} />
  );
});

describe( 'RadioGroup component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();

    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "handleChange" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'handleChange' );
    expect( typeof wrapped.props().handleChange ).toEqual( 'function' );
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
