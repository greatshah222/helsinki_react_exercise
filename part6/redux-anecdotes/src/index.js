import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import ancedoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';
import filterReducer from './reducers/filterReducer';
import thunk from 'redux-thunk';
// without using thunk stup of devtools
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  anecdote: ancedoteReducer,
  notification: notificationReducer,
  filterValue: filterReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
