/* global describe, it, beforeEach */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CryptoForm from '../../containers/CryptoForm';
import SelectWrapper from '../../components/SelectWrapper';
import Info from '../../components/Info';

let wrapper;
let mounted;
let store;

const mockStore = configureStore();
const storeData = {
  api: {
    status: 200,
    data: []
  }
};

beforeEach(() => {
  store = mockStore( storeData );
  wrapper = shallow( <CryptoForm store={store} /> );
  mounted = mount(
    <Provider store={store}>
      <CryptoForm>
        <SelectWrapper
          name=""
          value={{}}
          selectData={[]}
          selectedOption={{}}
          handleChangeSelect={() => {}}
        />
        <Info text="hola" type="red"/>
      </CryptoForm>
    </Provider>
  );
});

describe( '<CryptoForm />', () => {
  it( 'should be defined', () => {
    expect( wrapper ).toBeDefined();
  });
  it( 'should render a Button Component', () => {
    expect( mounted.find( 'Button' )).toHaveLength( 1 );
  });
  it( 'should render a form tag', () => {
    expect( mounted.find( 'form' )).toHaveLength( 1 );
  });
  it( 'should render a SelectWrapper component', () => {
    expect( mounted.find( 'SelectWrapper' )).toHaveLength( 1 );
  });
});
