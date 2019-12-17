import { combineReducers } from 'redux';
import formReducer from './components/Form/reducer';
import mapReducer from './components/MapBlock/reducer';

const rootReducer = combineReducers({
    form: formReducer,
    map: mapReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>
