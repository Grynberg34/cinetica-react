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
import CategoriasId from './components/CategoriasId.js';
import TagsId from './components/TagsId.js';
import AutoresId from './components/AutoresId.js';
import AnosId from './components/AnosId.js';
import {store} from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/texto/:id" element={<Texto />}></Route>
        <Route path="/categorias" element={<Categorias />}></Route>
        <Route path="/categorias/:id/:page" element={<CategoriasId />}></Route>
        <Route path="/tags" element={<Tags />}></Route>
        <Route path="/tags/:id/:page" element={<TagsId />}></Route>
        <Route path="/autores" element={<Autores />}></Route>
        <Route path="/autores/:id/:page" element={<AutoresId />}></Route>
        <Route path="/anos" element={<Anos />}></Route>
        <Route path="/anos/:id/:page" element={<AnosId />}></Route>
      </Routes>
    </BrowserRouter>

  </Provider>,
  document.querySelector('#root')
);


