import { createStore, /*applyMiddleware,*/ compose } from 'redux';
// import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

function configureStore(initialState = {}){
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(),
    );
}

export const store = configureStore({});
