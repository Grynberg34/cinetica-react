import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/App';
import Texto from './components/Texto';
import {store} from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/texto/:id" element={<Texto />}></Route>
      </Routes>
    </BrowserRouter>

  </Provider>,
  document.querySelector('#root')
);


