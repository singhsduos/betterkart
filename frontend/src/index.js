import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Favicon from 'react-favicon';

// Alert Message CSS
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  
}

ReactDOM.render(
  <Provider store={store}>
    
    <AlertProvider template={AlertTemplate} {...options}>
      <Favicon url='https://user-images.githubusercontent.com/32032008/151602278-be08dd08-594a-44e0-9451-1cbe3a009fbe.jpeg' />
      <App />
    </AlertProvider>

  </Provider>,
  document.getElementById('root')
);


