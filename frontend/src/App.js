import React from 'react';
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from './components/Home';
import Loginregister from './components/Login';
// import App_Home from './components/App_Home';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <React.Fragment>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Sign" element={<Loginregister/>}/>
          {/* <Route path="/Appshield" element={<App_Home/>}/> */}
        </Routes>
    </React.Fragment>
  );
}

export default App;
