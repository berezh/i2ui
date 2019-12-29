import { compose, createStore } from 'redux';

import { createRootReducer } from './root-reducer';

const composeEnhancers = compose;
// if (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
//     composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
// }

const store = createStore(createRootReducer(), {}, composeEnhancers());

export { store };
