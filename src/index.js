import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Components/Header/Header';
<script src="https://gatewayt.moneris.com/chkt/js/chkt_v1.00.js"></script>

// const darkMode = 700
// const root = document.getElementById('root')
// if(darkMode >= 1800){
// root.style.backgroundColor = '#121921'
// }
// if(darkMode < 1800 || darkMode > 600){
//   root.style.backgroundColor = 'white'
// }
ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
