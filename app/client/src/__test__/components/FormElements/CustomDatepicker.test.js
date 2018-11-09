import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import CustomDatePicker from '../../../components/FormElements/CustomDatepicker';

const formData = require( '../../../config/data' ).dateFields;

let wrapped;
const component = <CustomDatePicker date="Thu Oct 18 2018 00:00:00 GMT+0100 (British Summer Time)" handleChangeDate={() => {}} formData={formData} />;

beforeEach(() => {
  wrapped = shallow( component );
});

describe( 'CustomDatePicker component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();

    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "handleChangeDate" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'handleChangeDate' );
    expect( typeof wrapped.props().handleChangeDate ).toEqual( 'function' );
  });

  it( 'should have a "date" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'date' );
    expect( wrapped.props().date ).toEqual( 'Thu Oct 18 2018 00:00:00 GMT+0100 (British Summer Time)' );
  });

  it( 'should have a "formData" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'formData' );
    expect( wrapped.props().formData.name ).toEqual( 'dateCrypto' );
  });
});
