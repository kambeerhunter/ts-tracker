import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import Dashboard from './index';


describe('Dashboard tests', () => {
  const store = {
    form: {
      dots: [],
    },
    map: {
      center: [1, 2]
    }
  };
  const mockStore = createStore(rootReducer, store);

  const wrapper = mount(
    <Provider store={mockStore}>
      <Dashboard/>
    </Provider>
  );

  test('Test dashboard render', () => {
    expect(wrapper.find('form').length).toEqual(1);
    expect(wrapper.find('.text-danger').text()).toEqual('Список точек пуст');
  });
});
