import { DotActionTypes, DotType } from '../../actions/form';

export interface StateType {
  dots: Array<DotType>
}

const initialState: StateType = {
  dots: [
    {
      id: 1,
      title: 'test1',
      coordinates: [59.024465, 30.980121]
    },
    {
      id: 2,
      title: 'test2',
      coordinates: [60.024465, 28.980121]
    },
    {
      id: 3,
      title: 'test3',
      coordinates: [58.024465, 28.980121]
    },
  ],
}

const formReducer = (state = initialState, action:DotActionTypes) => {
  switch (action.type) {
    case 'ADD_DOT':
      return ({
        ...state,
        dots: [
          ...state.dots,
          action.payload
        ]
      })
    case 'REMOVE_DOT':
      return ({
        ...state,
        dots: [...state.dots].filter(dot => dot.id !== action.payload).map(
          item => ({ ...item })
        ),
      })
    case 'REORDER_DOTS':
      const { source, destination } = action.payload;
      const result = [...state.dots];
      const [removed] = result.splice(source, 1);
      result.splice(destination, 0, removed);
      return {
        ...state,
        dots: result,
      }
    case 'UPDATE_DOT':
      const { id } = action.payload;
      const index = [...state.dots].findIndex(item => item.id === id)
      const dots = [...state.dots];
      dots.splice(index, 1, action.payload);

      return {
          ...state,
          dots
      }
    default:
      return state
  }
}

export default formReducer;
