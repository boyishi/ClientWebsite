import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from './components/ClientList'
import ClientEdit from './components/ClientEdit';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/clients" exact element={<ClientList/>} />
        <Route path="/clients/:id" element={<ClientEdit/>} />
      </Routes>
    </Router>
  );
}

export default App;
