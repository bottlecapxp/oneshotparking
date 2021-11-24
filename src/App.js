import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Main from './Pages/Main';
import GuestDataCapture from './Pages/GuestDataCapture';
import SetTime from './Pages/SetTime';
import { PaymentContext } from './Context/PaymentContext';
import { useState, useMemo} from 'react';
import Selectmethod from './Pages/Selectmethod';
import { CountDown } from './Pages/CountDown';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import StripePayment from './Stripe/Stripe-CC-Payment'
import LongTimeSelections from "./Pages/LongTimeSelection"


const stripePromise = loadStripe('pk_test_51J3hpXGLCAc2YCrX4xp7zf6QGq4pzhjjIfsjyqYxJmmsJDPZF7Tu7lVC7Uh0IxC4lO14wBpa26vXxfMhmPrRVLJn00XtTPcVSN');

function App() {
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
