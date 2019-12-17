import React from 'react';
import { mount } from 'enzyme';
import Form from './index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

describe('Form tests', () => {
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
      <Form/>
    </Provider>
  );

  test('Render form', () => {
    expect(wrapper.find('form').length).toEqual(1)
  });

  test('Add dot in store', () => {
    const item = {
      id: new Date().getDate(),
      title: 'test dot',
      coordinates: [1, 1]
    }
    mockStore.dispatch({
      type: 'ADD_DOT',
      payload: item
    })
    expect(mockStore.getState().form.dots.length).toEqual(1)
  });

  test('Test form submit', () => {
    // eslint-disable-next-line
    wrapper.find('input').at(0).instance().value = 'test dot after submit';
    wrapper.find('form').first().simulate('submit');
    expect(mockStore.getState().form.dots.length).toEqual(2)
  })
});
