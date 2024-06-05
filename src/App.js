import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Link, Routes } from 'react-router-dom';
import Curso from './curso';
import Detalle from './Detalle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Curso} />
        <Route path="/detalle/:curso/:nombre" Component={Detalle} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
