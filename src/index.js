import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import {Route, Routes} from 'react-router-dom'
import { Route, Routes, BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<App/>} />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
