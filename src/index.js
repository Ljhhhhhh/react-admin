// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));


import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes';
// import { Provider } from "react-redux";
// import store from './store'

ReactDOM.render((
  // <Provider store={store}>
    <Router />
  // </Provider>
), document.getElementById('root'));