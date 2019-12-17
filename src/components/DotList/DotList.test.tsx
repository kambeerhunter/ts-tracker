import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';
import DotList from './index';

describe('Dot list tests', () => {
  const store = {
    form: {
      dots: [{
        id: new Date().getDate(),
        title: 'test dot',
        coordinates: [1, 1]
      }],
    },
    map: {
      center: [1, 2]
    }
  };
  const mockStore = createStore(rootReducer, store);

  const wrapper = mount(
    <Provider store={mockStore}>
      <DotList/>
    </Provider>
  );

  test('Test dots render', () => {
    expect(wrapper.find('.dot-item').length).toEqual(1)
  });

  test('Remove dot from list', () => {
    wrapper.find('.dot-item button').first().simulate('click');
    expect(wrapper.find('.dot-item').length).toEqual(0);
  });
});
