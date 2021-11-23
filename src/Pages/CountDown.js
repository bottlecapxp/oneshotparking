import React, { useState, useContext, useEffect } from 'react'
import { PaymentContext } from '../Context/PaymentContext'
import Receipt from '../Components/Receipt/Receipt'
import {useHistory} from 'react-router-dom'



export const CountDown = () => {
    const history = useHistory()
    const { darkMode } = useContext(PaymentContext)
    const getSetTime = localStorage.getItem('expTimeInSecs')
    const [showReceipt, setShowReceipt] = useState(false)
    const expiredTime = localStorage.getItem('expTime')
    const [darkModeStyle, setDarkModeStyle] = useState({
        globalContainer: 'global_container',
        color: '#585858',
        circleAnimation: 'circleAnimation',
        countDownAdj: 'countdown_adjustment'
    })

        var orange;
        var orangeTxt;
        var verbageChange = 'Active Session'

    const [containerStyling, setContainerStyling] = useState({
        divStyle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonStyle: {
            marginTop: '30px',
            border: '1px solid #848484',
            fontSize: '13px',
            // border: '1px solid #FF4F4F',
            padding: '10px',
            borderRadius: '10px',
            margin: '0px 5px 0px 5px',
            boxShadow: '10px 10px 30px rgba(174, 174, 192, 0.4), -10px -10px 30px #FFFFFF'
        },
        buttonDiv: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
        }
    })
    const toggle = () => {
        setShowReceipt(!showReceipt)
    }


const [activeSession, setActiveSession] = useState({ 
    style: { 

    }
})

    var getExpTimeInSecs = localStorage.getItem('expTimeInSecs')
    var date = new Date()
    var d = 0
    var m = date.getMinutes() * 60
    var h = date.getHours() * 3600
    var s = date.getSeconds()
    var sum = 0
    

    var hour_ = Math.floor(getSetTime / 100) * 3600
    var minutes_ = Math.round(getSetTime % 100) * 60
    var count = getSetTime - sum
    console.log(expiredTime)


    // Add this to local storage as the initial time
    const [countDown, setCountDown] = useState({
        days: Math.floor(getSetTime / 100),
        hours: Math.floor(getSetTime / 100),
        mins: Math.round(getSetTime % 100),
        secs: 60
    })




    var counter = null;



    const initCounter = () => {
        if (localStorage.getItem('count') == null || localStorage.getItem('count') == 0) {
            localStorage.setItem('count', count);
        }

        count = getLocalStorage('count');

        counter = setInterval(timer, 1000);
    }

    const setLocalStorage = (key, value) => {
        if (localStorage) {
            localStorage.setItem(key, value);
        }
        return value;
    }

    const getLocalStorage = (key) => {
        return localStorage ? localStorage.getItem(key) : '';
    }



    const timer = () => {
        // Set conditions for active session behavior
        // color, text, sms
        var date_y = new Date()
        if(date_y.getMinutes() > m || date_y.getHours() > h || date_y.getSeconds() > s){
            m = date_y.getMinutes()
            h = date_y.getHours()
            s = date_y.getSeconds()
            sum = (h * 3600) + (m * 60)
            console.log(`sum: ${sum} - ${h}:${m}:${s}`)
        }
      
     
        count = setLocalStorage('count', getExpTimeInSecs - sum);
        if (count <= 0) {
            localStorage.setItem('count', 0)
            localStorage.setItem('expTimeInSecs', 0)

            setCountDown({
                days: '00',
                hours: '00',
                mins: '00',
                secs: '00'
            })
            clearInterval(counter);
            return;
        }
        var dayscount = days * 24
        var hour = ((getExpTimeInSecs - sum)/ 3600) 

        var seconds = count % 60
        var minutes = Math.floor(count / 60)
        var hours = Math.floor(minutes / 60)
        var days = Math.floor(hours / 24)
        minutes %= 60;
        hours = (days > 0?hours - (days * 24):hours %= 60)
        // days %= 24


console.log(days)
console.log(hour - dayscount)   

console.log(hours)
console.log(minutes)
console.log(hours / 24)

        setCountDown({
            days: days,
            hours: hours,
            mins: minutes,
            secs: 60 - s
        })
        ;
        ;

    }

const make_change_base_on_time = () => { 
if(countDown.hours == 0 && countDown.mins < 20){ 
  orange = 'countdown_adjustment_orange'
  orangeTxt = 'txtOrange'
}
if(countDown.hours == 0 && countDown.mins <= 10){ 
    orange = 'countdown_adjustment_red'
    orangeTxt = 'txtRed'
    verbageChange = 'Expiring Soon'
  }
  if(countDown.mins == 0 && countDown.hours == 0){ 
    orange = 'countdown_adjustment_red'
    orangeTxt = 'txtRed'
    verbageChange = 'Session Ended'
  }
}
make_change_base_on_time()





    // Set mutable variables for updates
    // These are the times updated times     


    useEffect(() => {
        if (darkMode >= 1800 || darkMode <= 600) {
            setDarkModeStyle({
                globalContainer: 'global_container_dark',
                color: 'white',
                submitBtn: 'submitBtn_dark',
                circleAnimation: 'circleAnimation_dark',
                countDownAdj: 'countdown_adjustment_dark'
            })
            setContainerStyling({
                divStyle: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                buttonStyle: {
                    marginTop: '30px',
                    border: '1px solid #EA4335',
                    fontSize: '13px',
                    // border: '1px solid #FF4F4F',
                    padding: '10px',
                    borderRadius: '10px',
                    margin: '0px 5px 0px 5px',
                    color: '#EA4335',
                    background: '#1E2834',
                    boxSizing: 'border-box',
                    boxShadow: '10px 10px 30px rgba(0, 0, 0, 0.6), -10px -10px 30px rgba(255, 255, 255, 0.12)'

                },
                buttonDiv: {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-around'
                }
            })
        }
        



        initCounter()
    }, [])

    return (
        <div style={{overflowY: 'hidden'}} className={`${darkModeStyle.globalContainer} choose_lot ${orange}`}>
            <div style={containerStyling.divStyle}>
                <div className='pulse_holder'>
                <div className={darkModeStyle.circleAnimation}></div>
                <div className='countdown_digits_holder'>
                    <div className={`${darkModeStyle.countDownAdj} ${orange}`}>
                        <h3 className={orangeTxt} style={{ marginBottom: '0px' }}>{verbageChange}</h3>
                        <div className='countdown_digits'>
                        {countDown.days > 0?(<span className={`digits ${orangeTxt}`}>{`${countDown.days}d`}</span>): ''}
                            <span className={`digits ${orangeTxt}`}>{`${countDown.hours}h`}</span>
                            <span className={`digits ${orangeTxt}`}>{`${countDown.mins}m`}</span>
                            <span className={`digits ${orangeTxt}`} >{countDown.secs == 60?'00':`${countDown.secs}`}s</span>
                        </div>
                    </div>

                </div>
                </div>
                {showReceipt ? <Receipt close={toggle}/> : ''}

                <h4 className={orangeTxt} style={{ marginTop: '30%', color: darkModeStyle.color }}>Your Time Expires at: {expiredTime}</h4>
                <div style={containerStyling.buttonDiv}>
                    <span className={`${orange} ${orangeTxt}`} style={containerStyling.buttonStyle} onClick={()=>{history.push('/1111')}}>Extend My Time</span>
                    <span className={`${orange} ${orangeTxt}`} onClick={toggle} style={containerStyling.buttonStyle}>View My Receipt</span>
                </div>

            </div>

            {/* Count down time */}
            {/* Buttone to Extend time here */}
        </div>
    )
}




// console.log(time.getSeconds())
// localStorage.setItem('secs', updated_secs--)

// if(updated_secs <= 0 ){
//     localStorage.setItem('secs', 60)

//  clearInterval(run)
//         // localStorage.setItem('mins', updated_mins)
//         // localStorage.setItem('secs', 60)
//     }
// if(updated_mins == 0){
//     updated_hours--
//     localStorage.setItem('hours', updated_hours)
//     localStorage.setItem('mins', 60)
//     // updated_mins = 60
// }
// if(updated_hours == 0){
//     localStorage.setItem('hours', '00')
//     // updated_hours = '00'
// }