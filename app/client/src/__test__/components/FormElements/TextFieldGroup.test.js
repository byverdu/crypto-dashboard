import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import TextFieldGroup from '../../../components/FormElements/TextFieldGroup';

const formData = require( '../../../config/data' ).inputFields;

let wrapped;
const component = <TextFieldGroup handleChangeInput={() => {}} formData={formData} />;

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

  it( 'should have a "handleChangeInput" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'handleChangeInput' );
    expect( typeof wrapped.props().handleChangeInput ).toEqual( 'function' );
  });

  it( 'should have a "formData" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'formData' );
    expect( wrapped.props().formData.length ).toBeGreaterThanOrEqual( 2 );
  });
});
