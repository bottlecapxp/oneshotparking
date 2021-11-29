import React, { useContext, useState, useEffect, useCallback } from "react";
import { PaymentContext } from '../../Context/PaymentContext'
import "../Timer/Timer.css";
import Tick from './../../Assets/tick.mp3'
import { Howl, Howler } from 'howler'
import Time from './Time'

import {
	CircularInput,
	CircularTrack,
	CircularProgress,
	CircularThumb,
} from "react-circular-input";
import TimerLogic from "./TimerLogic";
import { useMemo } from "react";




const Timer = (props) => {
	// const today = new Date();
	const timerLogic = new TimerLogic();
	const time_obj = new Time()

	const { totalbilling, dayTime, dayTimeBilling, nightTime, nightTimeBilling, setExpiredTime, setStartTime, darkMode } = useContext(PaymentContext)
	// const pGenerator = new PaymentGenerator();
	const [value, setValue] = useState(null);
	const [validateDayTime, setDayTimeValidation] = useState()
	const [validateNightTime, setNightTimeValidation] = useState()
	const [darkModeStyle, setDarkModeStyle] = useState({
		circleContainer: 'timeInfo', 
		costAmount: 'cost_amount',
		circularTrack: '#eee'
		 
	 })
	 const  [maxParking, setMaxParking] = useState({
		 day: 3, 
		 night: 6
	 })
	 const date = new Date()
	 const get_current_mins = date.getMinutes()
	const preHr_check = Math.floor(timerLogic.scrollTime(value) / 100)
	var minutes = Math.floor(timerLogic.scrollTime(value)%100)
	var hours = preHr_check  // fixes issue where 

	const rem_minutes = 60 - get_current_mins

	const start_time_unit = ['am', 'pm']; 
	const currentTime = new Date();
	var startTime = `${currentTime.getHours() > 12?currentTime.getHours() - 12: currentTime.getHours()}:${currentTime.getMinutes() < 10? `0${currentTime.getMinutes()}`: currentTime.getMinutes()}${currentTime.getHours() >= 12?start_time_unit[1]:start_time_unit[0]}`







	// var expiredMinutes = parseInt(currentTime.getMinutes() + minutes)
	// var expiredHours = currentTime.getHours() + hours
	// var timer_expired_hours = currentTime.getHours() + hours




	// FULL TIME CALCULATIONS.
	var expTime, expTimeInSecs
	expTime = time_obj.genrate_expired_time(hours, minutes)
	console.log(hours)
	expTimeInSecs = time_obj.set_expTime_to_secs() + (minutes * 60)
	console.log(`hours: ${hours} minutes ${minutes}`)


	localStorage.setItem('expTimeInSecs', expTimeInSecs)
	localStorage.setItem('expTime', expTime)
	localStorage.setItem('total', totalbilling)

	
	// Keeps track of time changes

	 var startTime = time_obj.start_time()
	useEffect(() => {
		// if(darkMode >= 1800 || darkMode <= 600){
		// 		setDarkModeStyle({
		// 			circleContainer: 'timeInfo_dark', 
		// 			costAmount: 'cost_amount_dark', 
		// 			circularTrack: '#1B242F'
		// 		})
		// 	}

		if (dayTime == 0) {
			setDayTimeValidation(true)
		} else { setDayTimeValidation(false) }
		if (nightTime == 0) {
			setNightTimeValidation(true)
		}
		localStorage.setItem('startTime', startTime)

		if(hours >= 24){ 
		return;
		}
		if(hours <= 0 && props.addTime == '-0.0417'){ 
			return;
		}
		else{
				setValue(value + props.addTime);
		}


		// console.log(Math.round(value))
 

	}, [props.addTime]);
	setStartTime(startTime)
	setExpiredTime(expTime)

var test = 0
const scroll_wheel_hr = parseInt(localStorage.getItem('_time_btn_hr'))
const scroll_wheel_meridian = localStorage.getItem('_time_btn_meridian')



	return (
		<div className='timer_container'>
			<div className='timer_holder'>
				<div id={darkModeStyle.circleContainer}>
					<div id='time_holder'>
					<p className='set_time' style={{marginTop: '10px'}}>Set Duration</p>
					<p id='time'>{`${hours}h:${minutes}m`}</p>

						{/* <p id='time'>{(hours == 5?'Max Parking':`${hours}h:${minutes}m`)}</p> */}

					<p className='set_time' style={{marginTop: '10px'}}>Expires at</p>
					<p className='rate_' style={{textAlign: 'center'}}>{expTime}</p>	
					{/* <button className='set_time_button' style={{marginTop: '10px'}}>PARK LONGER</button> */}
					</div>
				</div>

				<CircularInput radius={115}
					value={value}
					onChange={(v) => {
						setValue(timerLogic.stepValue(v))	
						}}>
					<CircularTrack strokeWidth={10} stroke={darkModeStyle.circularTrack} />
					<CircularProgress className='bar' stroke='#ff4f4f' strokeWidth={12} />
					<CircularThumb r={15} fill='#F0F0F3' stroke='#ff4f4f' />
				</CircularInput>
			</div>


			<div className='cost_holder'><div id={darkModeStyle.costAmount}>Total Cost: </div><div className='price'>${`${totalbilling}`}</div></div>

		</div>
	);
};
export default Timer;

// if(scroll_wheel_meridian  == 'am' && scroll_wheel_hr < 6){
// 	if(6 - date.getHours() >= maxParking.night){
// 		test = maxParking.night
// 	}
// 	else{
// 		test = null
// 	}
// }
// if(scroll_wheel_meridian == 'am' && scroll_wheel_hr > 6 && scroll_wheel_hr < 12){
// 	if((12 - date.getHours() + 6) >= maxParking.day){
// 		test = maxParking.day
// 	}
// 	else{
// 		test = null
// 	}
// }
// if(scroll_wheel_meridian == 'pm' && scroll_wheel_hr < 6){
// 	if(18 - date.getHours() >= maxParking.day){
// 		test = maxParking.day
// 	}
// 	else{
// 		test = null
// 	}
// }
// if(scroll_wheel_meridian == 'pm' && scroll_wheel_hr > 6 && scroll_wheel_hr < 12){
// 	if(30 - date.getHours() >= maxParking.night || 30 - (scroll_wheel_hr + 12) > maxParking.night){
// 		test = maxParking.night
// 	}
// 	else{
// 		test = null
// 	}
// }
// (cMins < 10? `0${cMins}`: cMins)
// timerLogic.scrollTime(timerLogic.stepValue(value))%100
	
						{/* <p className='set_time'>Daily Rates</p> */}
						{/* Rates Settings */}
						{/* <div className='rate_container'>
							<div className='daily_container day'>
								<img id='sun' src={Day} alt='sun'></img>
								<p className='rate_'>$4hr</p>
							</div>
							<div className='daily_container night'>
								<img id='moon' src={Moon} alt='moon'></img>
								<p className='rate_'>$6hr</p>
							</div>
						</div> */}
	// if(expiredHours == 24){
	// 	hours = 12
	// 	timeUnit = time_unit_[0]
	// }
	// if(expiredHours > 24){
	// 	hours = hours - 24
	// 	timeUnit = time_unit_[0]
	// }
	// if(expiredHours >= 12){
	// 	timeUnit = time_unit_[1]
	// }

	// if(currentTime.getHours() >= 12){
	// 	cTimeUnit = time_unit_[1]
	// }else{
	// 	cTimeUnit = time_unit_[0]
	// }


	// if(expiredMinutes > 60){
	// 	expiredMinutes = expiredMinutes - 60
	// 	expiredHours = expiredHours + 1
	// }

	// if(expiredHours > 12){
	// 	expiredHours = expiredHours - 12 
	// 	if(expiredHours > 12 ){ 
	// 		expiredHours = expiredHours - 12
	// 	}

	// }


	// if(minutes == 0){
	// 	minutes = '00'
	// }

// DEPRECATED CODE - LIVES FOR 30 DAYS THEN DELETED

// <div className='overlap_Cost'>
// {/* Day rate */}
// <div className='day_rate'>
// 	<div className='info_holder dayRate_icon'>
// 	<img id='sun' src={Day} alt='sun'></img>
// 	</div>

// 	<div id='hours_' className='info_holder dayRate_time'>{Math.floor(dayTime/100)}hrs : {Math.floor(dayTime%100)}mins</div>
// 	<div id='cost_' className='info_holder dayRate_cost'>${dayTimeBilling}</div>

// </div>
// {/* Night Rate */}
// <div className='night_rate'>
// 	<div className='info_holder nightRate_icon'>
// 	<img id='moon' src={Moon} alt='moon'></img>
// 	</div>
// 	<div id='hours_' className='info_holder dayRate_time'>{Math.floor(nightTime/100)}hrs : {Math.floor(nightTime%100)}mins</div>
// 	<div id='cost_' className='info_holder dayRate_cost'>${nightTimeBilling}</div>

// </div>

// </div>


	// const limits = [18, 24, 6]
	// if(hours == 5){
	// 	const date = new Date()
	// 	 const currentHours = date.getHours()
	// 	 const currentMins = date.getMinutes()
	// 	 const currentTime = (currentHours * 3600) + (currentMins * 60)

	// 	 var countdown_mins = 0
	// 	 const cMins = 60 - currentMins
	// 	 var countdown_hours = limits[0] - currentHours
	// 	if(currentHours > limits[2] && currentHours < limits[0]){ 
	// 		// let Calculate the countdown hours & mins 
	// 		if(currentMins != 0 || currentMins != '00'){ 
	// 			countdown_hours = countdown_hours - 1
	// 			countdown_mins = cMins
	// 			// currentTime in Seconds
	// 			var countdown_time = (countdown_hours * 3600) + (countdown_mins * 60)
	// 			var fulltime = currentTime + countdown_time
	// 			var fulltime_calc = fulltime / 3600
	// 			expiredHours = (fulltime_calc > 12? fulltime_calc - 12: fulltime_calc )
	// 			expiredMinutes = '00'

	// 		} 
	// 		if(currentMins == 0 || currentMins == '00'){ 
	// 			var countdown_time = (countdown_hours * 3600) + (countdown_mins * 60)
	// 			var fulltime = currentTime + countdown_time
	// 			var fulltime_calc = fulltime / 3600
	// 			expiredHours = (fulltime_calc > 12? fulltime_calc - 12: fulltime_calc )
	// 		}

	// 		// Then let's introduce the remaining time. 


	// 	}
	

	// }