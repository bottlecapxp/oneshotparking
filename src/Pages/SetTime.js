import React, { useContext, useEffect, useState } from 'react'
import { PaymentContext } from '../Context/PaymentContext'
import "../Pages/pages.css";
import CircleTxtBtns from "../Components/Buttons/CircleBtns_txt/CircleTxtBtns";
import CircleBtnsImg from "../Components/Buttons/CircleBtn_img/CircleBtnsImg";
import Timer from "../Components/Timer/Timer";
import Time from "../Components/Timer/Time";
import MaxCondition from '../Components/max_selection/MaxSelection'
import { useHistory } from 'react-router'
import { getQueriesForElement } from '@testing-library/dom';
import DailyParking from '../Components/Buttons/24+/DailyParking';
import Header from '../Components/Header/Header';


const SetTime = (props) => {
	const history = useHistory()
	const { darkMode } = useContext(PaymentContext)
	const [darkModeStyle, setDarkModeStyle] = useState({ globalContainer: 'global_container' })
	const [lot, setLot] = useState(0)
	const [btnClickUpdate, setBtnClickUpdate] = useState(0.0)
	const [val, setVal] = useState(0.0)
	const mxCond = new MaxCondition()
	const date = new Date()
	const max_min_skip = 0.0417 / 60
	var max_num = date.getHours()
	var max_mins = date.getMinutes()
	const time = new Time()

	// Time update nested func for button onClick()
	const timeUpdate = (val) => {
		var nValue = parseFloat(val)
		setVal(nValue)
		// check for match
		if (val == btnClickUpdate) {
			reset()
		}
		else (
			setBtnClickUpdate(nValue)
		)
	}

	useEffect(() => {

		localStorage.setItem('max_count', 0)
		localStorage.setItem('backbutton', true)

		localStorage.setItem('max', 0)
		if (localStorage.getItem('lot') === null) {
			// localStorage.setItem('lot', 4001)
			localStorage.setItem('lot', props.match.params.lot)
		}
		else if (localStorage.getItem('lot') != null) {
			localStorage.removeItem('lot')
			setTimeout(() => {
				localStorage.setItem('lot', props.match.params.lot)
			}, 10)
		}
		setLot(props.match.params.lot)
		if (darkMode >= 1800 || darkMode <= 600) {
			setDarkModeStyle({
				globalContainer: 'global_container_dark',
			})
		}
		if (btnClickUpdate == 0) {
			setBtnClickUpdate(val)
		}
	}, [btnClickUpdate])


	const reset = () => {
		setBtnClickUpdate(0.0)
	}



const set_max_skip = () => {
	switch (max_num) {
		case (max_num >= 18 ? max_num : ''):	
			return (30 - max_num) * 0.0417
			break;
		case (max_num > 6 && max_num < 18? max_num : ''):
				return (18 - max_num) * 0.0417
			break;
		case (max_num < 6? max_num : ''):
			return (6 - max_num) * 0.0417
			break;
	}
}

const trigger_longTerm_Parking = () => { 
history.push('/daily-parking')
}
	return (
		<>
		<Header home={true}/>
		<div className={`${darkModeStyle.globalContainer} choose_lot`}>
			<div id='content_holder'>
				<div className='timer_holder'>
					<div className='lot-info'>
						<h5><strong>LOT NUMBER:</strong> {lot}</h5>
					</div>
					<Timer addTime={btnClickUpdate} />
				</div>
				<div className='align_timer_btns'>
					<CircleTxtBtns addTime={timeUpdate} title='-1 Hr' time='-0.0417' />
					{/* <CircleTxtBtns addTime={timeUpdate} title='Max' time={set_max_skip()} /> */}
					<CircleTxtBtns addTime={timeUpdate} title='+1 Hr' time='0.0417' />
					<DailyParking link='/monthparking/'/>
				</div>

				<div className='align_timer_btns btns_img_container'>
					{/* <CircleBtnsImg title='' img='' /> */}
					<CircleBtnsImg title='Confirm' img='' class='plateCapture' />
					{/* <CircleBtnsImg title='' img='' /> */}
				</div>
			</div>
		</div>
		</>
	);
};

export default SetTime;
//  else if(newCheck == false) {
// 			switch (hour) {
// 				case (hour < 18 && hour > 6 ? hour : ''):
// 					const remaining_time = 18 - hour
// 					max_num = parseFloat(`0.0${remaining_time}`)
// 					localStorage.setItem('max', 1)
// 					// console.log(`rem_hr ${remaining_time}`)
// 					break;
// 				case (hour >= 18 && hour < 24 ? hour : ''):
// 					const rem_time = (24 - hour) + 6
// 					max_num = (rem_time > 9 ? max_num = parseFloat(`0.${rem_time}`) : parseFloat(`0.0${rem_time}`))
// 					localStorage.setItem('max', 1)
// 					break;
// 				case (hour < 6 ? hour : ''):
// 					const rem_hr = 6 - hour
// 					max_num = `0.0${rem_hr}`
// 					localStorage.setItem('max', 1)
// 					break;
// 				default: 
// 					max_num = '0.12'
// 					break;
// 			}
// 		}