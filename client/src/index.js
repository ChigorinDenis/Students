import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import App from './App';
import studentReducer from './reducers/studentReducer';
import filterReducer from './reducers/filterReducer';
import sortReducer from './reducers/sortReducer';

const rootReducer = combineReducers({
  students: studentReducer,
  filter: filterReducer,
  sort: sortReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
