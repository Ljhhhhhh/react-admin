import React from "react";
import ReactDOM from "react-dom";
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import Router from "./routes";
import './index.css'

// import { Provider } from "react-redux";
// import store from './store'

moment.locale('zh-cn');
ReactDOM.render(
  // <Provider store={store}>
  <LocaleProvider locale={zh_CN} >
    <Router />
  </LocaleProvider>,
  // </Provider>
  document.getElementById("root")
);
