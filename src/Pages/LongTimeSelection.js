import React from 'react'
import Picker from 'react-scrollable-picker'
import { useContext, useEffect, useState } from 'react/cjs/react.development'
import { PaymentContext } from '../Context/PaymentContext'
import CircleBtnsImg from '../Components/Buttons/CircleBtn_img/CircleBtnsImg'
import PaymentGenerator from '../Components/Financials/Calculator/PaymentGenerator'
import ScrollableDatePicker from '../Components/ScrollableDatePicker/ScrollableDatePicker'


/**
* @author
* @function LongTimeSelections
**/

const LongTimeSelections = (props) => {
    const { totalbilling, setBilling } = useContext(PaymentContext)
    var mins = []
    var hrs = []
    var month_days = []
    const date = new Date()
    const get_days_of_month = (month, year) => {
        return new Date(year, month, 0).getDate()
    }
    const find_todays_remaining_hrs = 24 - date.getHours()
    const days_in_current_month = get_days_of_month(date.getMonth(), date.getFullYear())
    const options = { month: 'long' }
    const current_month = new Intl.DateTimeFormat('en-US', options).format()


    const [selectedDate, setSelectedDate] = useState({
        date: '',
        hours: 0,
        minutes: 0
    })


    const setExpiredTime = (name, val, groups) => {
        const newGroup = groups
        setSelectedDate({
            ...selectedDate, [name]: val
        })
        newGroup[name] = val
        setSelectedDate(newGroup)
    }


    const generator = () => {
        var setdays, sethours
        const todaysDate = date.getDate()

        const selected_date_array = selectedDate.date.split(' ')
        const selected_date = parseInt(selected_date_array[1])

        // rules
        sethours = selectedDate.meridian == 'pm' ? (selectedDate.hours + 12) : selectedDate.hours
        if (todaysDate < selected_date) {
            setdays = selected_date - todaysDate
        }

        return { hours: sethours, mins: selectedDate.minutes, days: setdays == undefined ? 0 : setdays }
    }


    const constructing_billing = () => {
        var night_hr_rate, night_hr_max, day_hr_rate, day_hr_max, collective_days_rate, full_day_rate, startBilling, endofdayBilling, lastHr, remHr, collective_days
        var remNight, remDay, remExtra, last_night, last_day, last_extra, startSum, lastSum
        day_hr_rate = .10
        var dayLimit = 2
        var nightLimit = 3
        night_hr_rate = .20
        day_hr_max = .20
        night_hr_max = .60
        full_day_rate = (night_hr_max * 2) + day_hr_max
        var settime = generator()
        const startTime = `${date.getHours()>12?date.getHours()-12:date.getHours()}:${date.getMinutes() < 10?`0${date.getMinutes()}`:date.getMinutes()}${date.getHours() > 12? 'pm': 'am'}`
        var fullStartHr
        var dullEndHr


        collective_days_rate = settime.days >= 2 ? (settime.days - 1) * full_day_rate : 0
        collective_days = settime.days >= 2 ? settime.days - 1 : 0

        // current day calc
        if (date.getHours() < 6) {
            remHr = 6 - date.getHours()
            remNight = remHr >= nightLimit ? night_hr_max : remHr * night_hr_rate
            remDay = day_hr_max
            remExtra = night_hr_max
            fullStartHr = remHr + 18
            startSum = remNight + remDay + remExtra
        }
        if (date.getHours() > 6 && date.getHours() < 18) {
            remHr = 18 - date.getHours()
            remDay = remHr >= dayLimit ? day_hr_max : remHr * day_hr_rate
            remNight = night_hr_max
            remExtra = 0
            fullStartHr = remHr + 6
            startSum = remNight + remDay + remExtra

        }
        if (date.getHours() > 18) {
            remHr = 24 - date.getHours()
            remNight = remHr >= nightLimit ? night_hr_max : remHr * night_hr_rate
            remDay = 0
            remExtra = 0
            fullStartHr = remHr
            startSum = remNight + remDay + remExtra
        }




        // end date calc
        if (settime.hours <= 6) {
            last_night = settime.hours >= nightLimit ? night_hr_max : settime.hours * night_hr_rate
            last_day = 0
            last_extra = 0
            lastSum = last_night + last_day + last_extra
        }
        if (settime.hours > 6 && settime.hours <= 18) {
            last_night = night_hr_max
            last_day = (settime.hours - 6) >= dayLimit ? day_hr_max : (settime.hours - 6) * day_hr_rate
            last_extra = 0
            lastSum = last_night + last_day + last_extra
        }
        if (settime.hours > 18) {
            last_night = night_hr_max
            last_day = day_hr_max
            last_extra = (settime.hours - 18) >= nightLimit ? night_hr_max : (settime.hours - 18) * night_hr_rate
            lastSum = last_night + last_day + last_extra
        }
        // if(settime.hours == 0 && settime.mins == 0){

        // }
        const sumbilling = parseFloat(collective_days_rate + startSum + lastSum).toFixed(2)
        const expTime = `${selectedDate.date} - ${selectedDate.hours}:${selectedDate.minutes == 0 ? '00' : selectedDate.minutes}${selectedDate.meridian}`
        const summedTime = (fullStartHr + (collective_days * 24) + settime.hours + date.getHours())
        const expTimeInSecs = (summedTime + date.getHours()) * 3600
        const setCount = (date.getHours() * 3600) + (date.getMinutes() * 60)

        // localStorage.setItem('count', 0)
        localStorage.setItem('expTimeInSecs', expTimeInSecs)
        setBilling(sumbilling)
        localStorage.setItem('expTime', expTime)
        localStorage.setItem('total', totalbilling)
        localStorage.setItem('startTime', startTime)



        // console.log(setCount)
        // console.log(expTimeInSecs)
        // console.log(fullStartHr)
        // console.log(collective_days * 24)
        // console.log(settime.hours)
        // console.log(date.getHours())
        // console.log(summedTime)

        // console.log(startSum)
        // console.log(lastSum)

        return totalbilling
    }
    constructing_billing()
    generator()





    mins.push({ value: 0, label: 0 })

    for (var i = 0; i < 13; i++) {
        hrs.push({ value: i, label: i })
    }
    for (var i = date.getDate() + 1; i < (days_in_current_month + 1); i++) {
        month_days.push({ value: `${current_month.substring(0, 3)} ${i}`, label: `${current_month.substring(0, 3)} ${i}` })
    }


    return (
        <div className='global_container'>
            <h2 style={{ textAlign: 'center', paddingTop: '12%', color: 'red' }}>Set Your Expiration Time</h2>
            <ScrollableDatePicker expired={setExpiredTime} month={month_days} hours={hrs} minutes={mins} />
            <h4 style={{ textAlign: 'center', color: 'red' }}>Expires at:</h4>
            <p style={{ textAlign: 'center' }}>{selectedDate.date} - {`${selectedDate.hours}:${selectedDate.minutes == 0 ? '00' : selectedDate.minutes}${selectedDate.meridian}`}</p>
            <h4 style={{ textAlign: 'center', color: 'red' }}>Total Cost:</h4>
            <p style={{ textAlign: 'center' }}>${totalbilling}</p>

            <div className='scroll_confirm_holder'>
                <CircleBtnsImg title='Confirm' img='' class='plateCapture' />
            </div>
        </div>
    )

}

export default LongTimeSelections;







    // for (var i = 0; i < 60; i = i + 30) {
    //     mins.push({ value: i, label: i })
    // }