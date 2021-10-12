import React from 'react'
import ReactDom from 'react-dom'

import {Provider} from "react-redux"
import {createAppStore} from './store/appSaga'
import './index.css';
import App from './App';

function init() {
    const appStore = createAppStore()
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDom.render(
    <Provider store={appStore}>
      <App />
    </Provider>, app);
}

init();

