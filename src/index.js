import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import App from './components/App';
import Texto from './components/Texto';
import Categorias from './components/Categorias';
import Autores from './components/Autores';
import Anos from './components/Anos';
import Tags from './components/Tags';
import Explorar from './components/Explorar.js';
import Pesquisar from './components/Pesquisar.js';
import ScrollToTop from './components/ScrollToTop.js';
import {store} from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/texto/:id" element={<Texto />}></Route>
        <Route path="/categorias" element={<Categorias />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/autores" element={<Autores />}></Route>
        <Route path="/anos" element={<Anos />}></Route>
        <Route path="/:type/:id/:page" element={<Explorar />}></Route>
        <Route path="/pesquisar" element={<Pesquisar />}></Route>
      </Routes>
    </BrowserRouter>

  </Provider>,
  document.querySelector('#root')
);


