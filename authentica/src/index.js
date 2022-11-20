import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainApp from './MainApp';
import UserScreen from './UserScreen';
import reportWebVitals from './reportWebVitals';
import UpdateScreen from './UpdateScreen';
import RegisterScreen from './RegisterScreen';
import ToDo from './ToDo';
import Repos from './Repos';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Photo from './Photo';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
       <Routes>
          <Route path="/" element={<MainApp />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/update" element={<UpdateScreen />} />
          <Route path="/todo" element={<ToDo />} />
          <Route path="/repos" element={<Repos />} />
          <Route path="/photo" element={<Photo />} />
      </Routes>
    </Router>

    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
