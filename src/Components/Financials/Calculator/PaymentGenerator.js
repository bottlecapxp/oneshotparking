// import { useStripe } from '@stripe/react-stripe-js'
import { useContext} from 'react'
import { PaymentContext } from '../../../Context/PaymentContext'
import MaxSelection from '../../max_selection/MaxSelection'
import Util from './../../Utilities/Utilities'
import GeneratePrice from './GeneratePrice'





const PaymentGenerator = (hours, minutes, trigger) => {

    console.log(`hours - ${hours} mins - ${minutes}`)
    const { setNightTime, setNightTimeBilling, setDayTime, setDayTimeBilling, setBilling, setTime } = useContext(PaymentContext)
    const timeDate = new Date()
    const night_hourly_rate = .20
    const hourly_rate = .10
    const day_max_limit = 2
    const night_max_limit = 3
    var day_max_rate = .20
    var night_max_rate = .60
    const genPrice = new GeneratePrice()
    const util = new Util()
    var maxLimit_overflow
    const day_minute_rate = hourly_rate / 60
    const night_minute_rate = night_hourly_rate / 60
    const check_expired_hour = localStorage.getItem('_time_btn_hr')

    //parseInt(`${timeDate.getHours()}${timeDate.getMinutes()}`)
    var currentTime = parseInt(`${timeDate.getHours()}${timeDate.getMinutes() < 10?`0${timeDate.getMinutes()}`:timeDate.getMinutes()}`)
    var setLimit = parseInt(`${hours}${minutes}0`)
    var accumalatedTime = currentTime + setLimit
    var minuteCheck = accumalatedTime % 100
    var hourCheck = Math.floor(accumalatedTime / 100)
    var newMinutes, newHours, dayTime, nightTime, extraTime, sumTotal
    


    const check_and_adjust = () => {
        // Accumulated Time Check
        if (hourCheck > 23) {
            hourCheck = hourCheck - 24
        }
        if (minuteCheck >= 60) {
            newMinutes = minuteCheck - 60
            newHours = Math.floor((hourCheck) + 1)
            accumalatedTime = parseInt(`${newHours}${newMinutes}`)
            if (newMinutes < 10) {
                accumalatedTime = parseInt(`${newHours}0${newMinutes}`)
            }
            if (newMinutes === 0) {
                accumalatedTime = parseInt(`${newHours}00`)
            }
        } else {
            accumalatedTime = currentTime + setLimit //Current time + Set Limit time

        }
    }
    check_and_adjust()


    const setbillings = (set_day_time, set_daytime_billing, set_night_time, set_nighttime_billing, total_billing) => {
        setDayTime(set_day_time)
        setDayTimeBilling(set_daytime_billing)
        setNightTime(set_night_time)
        setNightTimeBilling(set_nighttime_billing)
        setBilling(total_billing)
    }


    const max_calculations = () => { 
        var timeSlot_bool = null

        if(minutes > 0){ 
            var maxBtn_timeSkip = parseInt(`${hours}${minutes}`)
            const currentMinuteCheck = currentTime % 100
            var sumTime = (currentTime + maxBtn_timeSkip)
            if(currentMinuteCheck + minutes == 60){ 
                sumTime = sumTime + 40
            }

            // Check parameters timeSlot of current time => (True = Night \ False = Day)
            currentTime > 1800 || currentTime < 600?timeSlot_bool = true:timeSlot_bool = false 
            

            var max_cost_calc = 0
            const max_limits = [1800,3000,4200, 5400, 600, ] //day // night // day
            
            if(timeSlot_bool == false && sumTime == max_limits[0]){ 
                var dayTimes = util.round(max_limits[0], currentTime, 100)
                console.log(dayTimes)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTimes, hourly_rate, day_max_limit, day_max_rate)
                console.log('max Trigger - ' + dayPrice)
                setbillings(dayTime, dayPrice, 0, 0, dayPrice)
            }
            if(timeSlot_bool == false && sumTime == max_limits[1]){ 
                dayTime = util.round(max_limits[0], currentTime, 100)
                nightTime = util.round(sumTime, max_limits[0], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }
            if(timeSlot_bool == false && sumTime == max_limits[2]){ 
                dayTime = util.round(max_limits[0], currentTime, 100)
                nightTime = util.round(max_limits[1], max_limits[0], 100)
                extraTime = util.round(sumTime, max_limits[1], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                const extraPrice = genPrice.max_calculate_extratime_payments(extraTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice + extraPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }

            // Night
            if(timeSlot_bool == true && sumTime == max_limits[1]){ //3000
                nightTime = util.round(max_limits[1], currentTime, 100)
                const nightPrice = genPrice.max_calculate_daytime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                console.log('max Trigger - ' + nightPrice)
                setbillings(nightTime, nightPrice, 0, 0, nightPrice)
            }
            if(timeSlot_bool == true && sumTime == max_limits[2]){ // 4200
                nightTime = util.round(max_limits[1], currentTime, 100)
                dayTime = util.round(max_limits[2], max_limits[1], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }
            if(timeSlot_bool == true && sumTime == max_limits[3]){ // 5400
                nightTime = util.round(max_limits[1], currentTime, 100)
                dayTime = util.round(max_limits[2], max_limits[1], 100)
                extraTime = util.round(max_limits[3], max_limits[2], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                const extraPrice = genPrice.max_calculate_extratime_payments(extraTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice + extraPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }

            // starting from below 6am
            if(timeSlot_bool == true && sumTime == max_limits[4]){ // 600
                nightTime = util.round(max_limits[4], currentTime, 100)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                setbillings(0, 0, nightTime, nightPrice, nightPrice)
            }
            if(timeSlot_bool == true && sumTime == max_limits[0]){ // 1800 starting from below 6am
                nightTime = util.round(max_limits[4], currentTime, 100)
                dayTime = util.round(max_limits[0], max_limits[4], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }
            if(timeSlot_bool == true && (currentTime < 600 && sumTime == max_limits[1])){ // 3000 starting from 6am
                nightTime = util.round(max_limits[4], currentTime, 100)
                dayTime = util.round(max_limits[0], max_limits[4], 100)
                extraTime = util.round(max_limits[2], max_limits[0], 100)
                const dayPrice = genPrice.max_calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
                const nightPrice = genPrice.max_calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
                const extraPrice = genPrice.max_calculate_extratime_payments(extraTime, night_hourly_rate, night_max_limit, night_max_rate)
                sumTotal = nightPrice + dayPrice + extraPrice
                setbillings(dayTime, dayPrice, nightTime, nightPrice, sumTotal)
            }
        }
    }



    const night_time = () => {
        // NEED TO SET CONDITIONS FOR ROLL OVER MINUTES
        if (currentTime >= 1800 && accumalatedTime <= 3000 || currentTime < 600 && accumalatedTime <= 600) {
            nightTime = util.round(accumalatedTime, currentTime, 100)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            console.log(nightPrice)
            setbillings(0, 0, nightTime, nightPrice, nightPrice) 
        }
        // overlap_time
        if(currentTime >= 1800 && accumalatedTime > 3000 && accumalatedTime <= 4200){ // if current time is greater than 6pm & setTime is > 6am and setTime is < 6pm
            dayTime = util.round(accumalatedTime, 3000, 100)           // util.round (setTime - nighttime) / 100   
            nightTime = util.round(3000, currentTime, 100)
            maxLimit_overflow = util.overlap_limit(3000,4200, accumalatedTime, day_minute_rate)
            console.log(accumalatedTime)
            const dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate, maxLimit_overflow)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            sumTotal = nightPrice + dayPrice
            setbillings(0, 0, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2)) 
        }
        //night => day => night
        if(currentTime >= 1800 && accumalatedTime > 4200){ 
            nightTime = util.round(3000, currentTime, 100)
            dayTime = util.round(accumalatedTime, 3000, 100)  
            extraTime = util.round(accumalatedTime, 4200, 100)
            console.log(accumalatedTime)
            maxLimit_overflow = util.overlap_limit(4200, 5400, accumalatedTime, night_minute_rate)
            const dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            const extraPrice = genPrice.calculate_extratime_payments(extraTime, night_hourly_rate,night_max_limit, night_max_rate, maxLimit_overflow)
            sumTotal = dayPrice + nightPrice + extraPrice
            setbillings(0,0, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2))
        }

        // night below 6am => day below => 6pm
        if(currentTime < 600 && accumalatedTime > 600 && accumalatedTime <= 1800){ // if current time is < 6am and setTime is greater than
            dayTime = util.round(accumalatedTime, 600, 100)  
            nightTime = util.round(600, currentTime, 100)
            maxLimit_overflow = util.overlap_limit(600, 1800, accumalatedTime, day_minute_rate, maxLimit_overflow)
            const dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            sumTotal = dayPrice + nightPrice
            setbillings(dayTime,dayPrice, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2))
        }
        // night below 6am => pass day => night again
        if(currentTime < 600 && accumalatedTime > 1800 && accumalatedTime <= 3000){ 
            dayTime = util.round(1800, 600, 100)  
            nightTime = util.round(600, currentTime, 100)
            extraTime = util.round(accumalatedTime, 1800, 100)
            maxLimit_overflow = util.overlap_limit(1800, 3000, accumalatedTime, night_minute_rate)
            const dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            const extraPrice = genPrice.calculate_extratime_payments(extraTime, night_hourly_rate, night_max_limit, night_max_rate, maxLimit_overflow)
            sumTotal = dayPrice + nightPrice + extraPrice
            setbillings(dayTime,dayPrice, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2))
        }
    }


    const day_time = () => {
        // NEED TO SET CONDITIONS FOR ROLL OVER MINUTES 
        if (currentTime > 600 && accumalatedTime <= 1800) {
            dayTime = util.round(accumalatedTime, currentTime, 100)
            var dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            setbillings(dayTime, dayPrice, 0, 0, parseFloat(dayPrice).toFixed(2))
            
        }
        // overlaping day => night
        if (currentTime < 1800 && (accumalatedTime > 1800 && accumalatedTime <= 3000)) { //current_time < 6pm(daytime) && setTime > 6pm & setTime is <= 6am then do something
            dayTime = util.round(1800, currentTime, 100)
            nightTime = util.round(accumalatedTime, 1800, 100)  // Generate night time
            maxLimit_overflow = util.overlap_limit(1800,3000, accumalatedTime, night_minute_rate)
            var dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            var nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate, maxLimit_overflow)


            console.log(currentTime)
            console.log(accumalatedTime)
            console.log(maxLimit_overflow)
            sumTotal = eval(dayPrice + nightPrice)
            console.log(sumTotal)
            setbillings(dayTime, dayPrice, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2))
        }
        // day => night => day
        if(currentTime < 1800 && (accumalatedTime > 1800 && accumalatedTime > 3000)){ 
            dayTime = util.round(1800, currentTime, 100)
            nightTime = util.round(3000, 1800, 100)
            extraTime = util.round(accumalatedTime, 3000, 100)
            maxLimit_overflow = util.overlap_limit(3000,4200, accumalatedTime, day_minute_rate)
            const dayPrice = genPrice.calculate_daytime_payments(dayTime, hourly_rate, day_max_limit, day_max_rate)
            const nightPrice = genPrice.calculate_nighttime_payments(nightTime, night_hourly_rate, night_max_limit, night_max_rate)
            const extraPrice = genPrice.calculate_extratime_payments(extraTime, hourly_rate, day_max_limit, day_max_rate, maxLimit_overflow)
            sumTotal = eval(dayPrice + nightPrice + extraPrice)
            console.log('this triggered too')
            setbillings(dayTime, dayPrice, nightTime, nightPrice, parseFloat(sumTotal).toFixed(2))
        }
    }

    if(minutes > 0){ 
        max_calculations()
    }
    if(minutes <= 0){ 
        night_time()
        day_time()
    }


}

export default PaymentGenerator;


