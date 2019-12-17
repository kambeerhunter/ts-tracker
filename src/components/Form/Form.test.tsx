import React from 'react';
import { mount } from 'enzyme';
import Form from './index';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../../reducers';

describe('Form tests', () => {
  const store = {
    form: {
      dots: [
        { id: 1 },
        { id: 2 }
      ],
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

  describe('Component tests', () => {
    test('Render form', () => {
      expect(wrapper.find('form').length).toEqual(1)
    });

    test('Test form submit', () => {
      // eslint-disable-next-line
      wrapper.find('input').at(0).instance().value = 'test dot after submit';
      wrapper.find('form').first().simulate('submit');
      expect(mockStore.getState().form.dots.length).toEqual(3)
    })
  });

  describe('Test reducer', () => {
    test('Add dot in store', () => {
      const item = {
        id: 3,
        title: 'test dot',
        coordinates: [1, 1]
      }
      mockStore.dispatch({
        type: 'ADD_DOT',
        payload: item
      })
      expect(mockStore.getState().form.dots.length).toEqual(4)
    });
  });

  test('Remove dot from store', () => {
    const removed_item = mockStore.getState().form.dots.find(item => item.id > 5)
    mockStore.dispatch({
      type: 'REMOVE_DOT',
      payload: removed_item.id
    })
    expect(mockStore.getState().form.dots.length).toEqual(3)
  })

  test('Reorder dots in store', () => {
    mockStore.dispatch({
      type: 'REORDER_DOTS',
      payload: {
        source: 1,
        destination: 3
      }
    })
    expect(
      mockStore.getState().form.dots.map(x => x.id)
    ).toEqual([1, 3, 2])
  })

  test('Update dot in store', () => {
    mockStore.dispatch({
      type: 'UPDATE_DOT',
      payload: {
        id: 3,
        title: 'new title',
        coordinates: [5, 5]
      }
    })

    const updated_item = mockStore.getState().form.dots.find(item => item.id === 3)
    expect(updated_item.title).toEqual('new title')
    expect(updated_item.coordinates).toEqual([5, 5])
  })
});
