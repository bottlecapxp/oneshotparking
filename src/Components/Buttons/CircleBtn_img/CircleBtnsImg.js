import React, { useState,useEffect, useContext } from "react"
import {useHistory} from 'react-router-dom'
import '../CircleBtn_img/CircleBtnimg.css'
import {PaymentContext} from '../../../Context/PaymentContext'



const CircleBtnsImg = (props) => {
    const history = useHistory()
    const darkMode = 1800
    const [darkModeStyle, setDarkModeStyle] = useState({
        buttonStyles: 'btn-confirm', 
 
    })


useEffect(()=>{
    if(darkMode >= 1800 || darkMode <= 600){
        setDarkModeStyle({
            buttonStyles: 'btn-confirm-dark',
            
        })
    }
    if(darkMode < 1800 || darkMode > 600){
        setDarkModeStyle({
            buttonStyles: 'btn-confirm',
            
        })
    }
}, [])

    const [timer] = useState({
        title: props.title,
        img: props.img,
        extra: props.class
    })
    const {time} = useContext(PaymentContext)
    const currentTime = new Date();
    var newTime = parseInt(`${currentTime.getHours()}${currentTime.getMinutes()}`)
    const expiredTime = newTime + time
    // const {time} = useContext(TimeContext)
    
    // Use this information to store in the database with added time to create the fixed limit
    // Then cross reference the current time with limit which should now provide the value to begin the cound down
    // This way we do not loose count down data in reload 
    // var getTime = new Date()
    // var currentHours = getTime.getHours()
    // var currentMins = getTime.getMinutes()


    // console.log(`${currentHours}:${currentMins}`)
    const payment_action = () => {
        if(props.link){ 
            history.push(props.link)
        }
        // Check local storage to see if it's Empty or Null
    if(localStorage.getItem('timeStore') === null){
        // if true then store given time to localstorage
        localStorage.setItem('timeStore', `${time}`)
        console.log(expiredTime)
        history.push('/guest/')
    }
    // We're checking to see if time exist if it does then capture and instatiate time as new time then perform task to that time to then push back to localstorage as new time post
    else if(localStorage.getItem('timeStore') != null){
        localStorage.removeItem('timeStore')
        updatingTime(time)

        history.push('/guest/')
       
    }

    }

    const updatingTime = (time) => {
            localStorage.setItem('timeStore', time)     
    }

    return (
        <span onClick={payment_action} className={`${darkModeStyle.buttonStyles} content-align ${timer.extra}`}>
            <span   className='confirm_title'>{timer.title}</span>
        </span>
    )
}
export default CircleBtnsImg;