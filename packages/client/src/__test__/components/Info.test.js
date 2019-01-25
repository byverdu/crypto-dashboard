import React from 'react';
import { shallow, mount } from 'enzyme';
import Info from '../../components/Info';
import renderer from 'react-test-renderer';

let wrapped;
let mounted;
const component = <Info type="error" message="xoxo" />;

beforeEach(() => {
  wrapped = shallow( component );
  mounted = mount(
    <Info type="info" message={null}><h1>Hello World</h1></Info>
  );
});

describe( 'Info component', () => {
  it( 'renders correctly', () => {
    const tree = renderer
      .create( component )
      .toJSON();
    expect( tree ).toMatchSnapshot();
  });

  it( 'should have a "type" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'type' );
    expect( wrapped.props().type ).toEqual( 'error' );
  });

  it( 'should have a "message" prop', () => {
    expect( wrapped.props()).toHaveProperty( 'message' );
    expect( wrapped.props().message ).toEqual( 'xoxo' );
  });

  it( 'should override the "message" prop with children', () => {
    const children = mounted.find( 'h1' ).text();

    expect( children ).toEqual( 'Hello World' );
  });
});
