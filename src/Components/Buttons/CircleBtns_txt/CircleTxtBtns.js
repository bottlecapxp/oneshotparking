import React, { useEffect, useState } from 'react'
import MaxConditon from '../../../Components/max_selection/MaxSelection'
import PaymentGenerator from '../../Financials/Calculator/PaymentGenerator'
import Time from '../../Timer/Time'
import '../CircleBtns_txt/CircleBtnstxt.css'

const CircleTxtBtns = ({ title, time, addTime, link}) => {
    // const {darkMode} = useContext(PaymentContext)
    const darkMode = 1800
    const [darkModeStyle, setDarkModeStyle] = useState({buttonStyles: 'global_circle_btns', title: 'title'})
    const [timer, setTimer] = useState({title: title, setTime: parseFloat(time)})
    const currentTime = new Date()
    const remMins = (60 - currentTime.getMinutes()) 
    var hour_, hour_calc,min_calc, sum


    const setTime_ = (hour) =>{ 
        hour_calc = (currentTime.getMinutes() > 0?hour - 1: hour_) * 0.041666666666666664
        min_calc = remMins * 0.000695
        sum = hour_calc + min_calc
        addTime(sum)
    }

    const incrementTime = () => {
        const time_wheel_hr = parseInt(localStorage.getItem('_time_btn_hr'))
        switch(title){
            case (title =='Max' && time_wheel_hr < 6?title:''):
                hour_ = (6 - time_wheel_hr) 
                setTime_(hour_)
                break;
            case (title =='Max' && (time_wheel_hr > 6 && time_wheel_hr < 12)?title:''):
                hour_ = ((12 - time_wheel_hr) + 6)
                setTime_(hour_)
                break;
            case (title == 'Max' && localStorage.getItem('_time_btn_hr') == '6'?title:''):
                hour_ = 12
                addTime( hour_ * 0.041666666666666664)
                break;
            default: 
            addTime(timer.setTime)
            break;
        }
    }
    
    useEffect(() => {
        if (darkMode >= 1800 || darkMode <= 600) {
            setDarkModeStyle({
                buttonStyles: 'global_circle_btns_dark',
                title: 'title_dark'
            })
        }
        if (darkMode < 1800 || darkMode > 600) {
            setDarkModeStyle({
                buttonStyles: 'global_circle_btns',
                title: 'title'
            })
        }
    }, [])


    return (
        <div className={`${darkModeStyle.buttonStyles} content-align`} onClick={incrementTime}>
            <span className={darkModeStyle.title}>{timer.title}</span>
        </div>
    )
}

export default CircleTxtBtns;