import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import GuestDataCapture from './Pages/GuestDataCapture';
import SetTime from './Pages/SetTime';
import { PaymentContext } from './Context/PaymentContext';
import { useState, useMemo, useEffect} from 'react';
import Selectmethod from './Pages/Selectmethod';
import { CountDown } from './Pages/CountDown';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripePayment from './Stripe/Stripe-CC-Payment'
import LongTimeSelections from "./Pages/LongTimeSelection"


const stripePromise = loadStripe(process.env.PUBLISHABLE_KEY);



function App(props) {
  const [totalbilling, setBilling] = useState()
  const [time, setTime] = useState()
  const [startTime, setStartTime] = useState()
  const [expiredTime, setExpiredTime] = useState()
  const [nightTime, setNightTime] = useState()
  const [nightTimeBilling, setNightTimeBilling] = useState()
  const [dayTime, setDayTime] = useState()
  const [dayTimeBilling, setDayTimeBilling] = useState()
  const [userInfo, setUserInfo] = useState()
  const [darkMode, setDarkMode] = useState(1200)
  const providerValue = useMemo(() => ({
    time, setTime, 
    nightTime, setNightTime,
    nightTimeBilling, setNightTimeBilling,
    dayTime, setDayTime,
    dayTimeBilling, setDayTimeBilling,
    totalbilling, setBilling,
    userInfo, setUserInfo,
    expiredTime, setExpiredTime,
    startTime, setStartTime,
    darkMode, setDarkMode
  }), [time, nightTime, nightTimeBilling, dayTime, dayTimeBilling, totalbilling, userInfo, expiredTime, startTime, darkMode])
  return (
    // basename={process.env.PUBLIC_URL}    //
<Router basename={process.env.PUBLIC_URL}>
  <Switch>
  <Elements stripe={stripePromise}>
    <PaymentContext.Provider value={providerValue}>
    <Route path='/guest/' exact strict component={GuestDataCapture} />
    <Route path='/:lot' exact strict component={SetTime} />
    <Route path='/monthparking/' exact strict component={LongTimeSelections} />
    <Route path='/select-payment/' exact strict component={Selectmethod} />
    <Route path='/remaining-time/' exact strict component={CountDown} />
    <Route path='/checkout/' exact strict component={StripePayment} />
    </PaymentContext.Provider>
    </Elements>
  </Switch>
</Router>
  )
}
export default App;
