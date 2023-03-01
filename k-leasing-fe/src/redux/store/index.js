import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import AsyncMiddleware from '../reducers/middleware/async';
const _getMiddleware = () => {
    const asyncMiddleware = new AsyncMiddleware().create();
    return [thunk, asyncMiddleware];
};
const middleware = _getMiddleware();
const composedMiddlewares = applyMiddleware(...middleware);
const store = createStore(rootReducer, composedMiddlewares);

export default store;