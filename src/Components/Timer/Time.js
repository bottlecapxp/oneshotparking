import React, { Component } from 'react'




class Time extends Component {
    constructor(props) {
        super(props)
        this.meridian_units = ['am', 'pm']
        this.__init_date__ = new Date()
        this.current_hour = this.__init_date__.getHours()
        this.current_mins = this.__init_date__.getMinutes()
        this.meridian_units_switch = this.current_hour > 12? true: false
        this.output_hour = ''
        this.sum_hours = null
        this.days = 0
        this.output_meridian = ''
        this.button_output = ''

    }

    set_expTime_to_secs = () =>{ 
        var output = ((this.sum_hours * 3600) + (this.current_mins * 60))
        return output
    }

    start_time = () =>{ 
        return `${this.current_hour}:${this.current_mins}${this.output_meridian}`
    }

    genrate_expired_time = (scrolled_hours, scrolled_mins) => {
        this.sum_hours = this.current_hour + scrolled_hours
        // console.log(this.sum_hours)
        // console.log(this.current_hour)
        // console.log(scrolled_hours)
        var set_hour_limitors = [12, 24, 36, 48]
        this.output_hour = this.sum_hours
        var button_meridian = this.output_meridian

        // mins check
        if (this.current_mins == 0) {
            this.current_mins = '00'
        }

        for (var i = 0; i < set_hour_limitors.length; i++) {
            if (this.sum_hours >=set_hour_limitors[i]) {
                if(this.sum_hours >= set_hour_limitors[0] && this.sum_hours < set_hour_limitors[1] || this.sum_hours >= set_hour_limitors[2] && this.sum_hours < set_hour_limitors[3]){
                    this.meridian_units_switch = true
                }
                if(this.sum_hours >= set_hour_limitors[1] && this.sum_hours < set_hour_limitors[2]){ 
                    this.meridian_units_switch = false
                }
                var iterate_set_hour_limitors = this.sum_hours - set_hour_limitors[i]
                this.output_hour = iterate_set_hour_limitors == 0?12:iterate_set_hour_limitors
            }
        }
        
        this.set_expTime_to_secs()
        this.output_meridian = this._switch_meridian_unit(this.meridian_units_switch)
        localStorage.setItem('_time_btn_hr', (this.current_mins + scrolled_mins) >= 60?this.output_hour +1:this.output_hour)
        localStorage.setItem('_time_btn_meridian', this.output_meridian)
        return `${(this.current_mins + scrolled_mins) >= 60?this.output_hour +1:this.output_hour}:${(this.current_mins + scrolled_mins) < 10 && (this.current_mins + scrolled_mins) > 0 ? `0${this.current_mins + scrolled_mins}` : (this.current_mins + scrolled_mins) >= 60? '00':(this.current_mins + scrolled_mins) }${this.output_meridian}`
    }


    _switch_meridian_unit = (meridian_ref) => {
        if(meridian_ref){
            return this.meridian_units[1]
        }
        else if(!meridian_ref){ 
            return this.meridian_units[0]
        }
    }
}
export default Time;

// const rate_change_limitors = [6, 12, 18, 24]
// const hour_wheel_calc = 0.0417
// const min_wheel_calc = hour_wheel_calc / 60
// var generating_hours = button_meridian == this.meridian_units[1]? parseInt(button_hours) + 12: button_hours
// // returns either 1..12 || 13..23  "We need to fix a bug 12 turns to 24 and midnight to 12"
// if(generating_hours == 12){ 
//     generating_hours = 12
// }

// if(button_hours != rate_change_limitors[0] || button_hours != rate_change_limitors[2]){ 
//     if(generating_hours > rate_change_limitors[0] && generating_hours < rate_change_limitors[2]){ 
//         this.button_output = rate_change_limitors[2] - generating_hours
//     }else
//     if(generating_hours > rate_change_limitors[2] && generating_hours < rate_change_limitors[3]){ 
//         this.button_output = (rate_change_limitors[3] - generating_hours) + rate_change_limitors[0]
//     }else
//     if(generating_hours < rate_change_limitors[0]){ 
//         this.button_output = rate_change_limitors[0] - generating_hours
//     }
// }
// if(button_hours == rate_change_limitors[0] || button_hours == rate_change_limitors[2]){ 
//     this.button_output = 12
// }

        
            
        // if(localStorage.getItem('_time_mdn_time') == this.meridian_units[0]){
        //     var remaining_time = 6 - localStorage.getItem('_time_btn_hr')
        //     if(localStorage.getItem('_time_btn_hr') < 6){ 
        //         remaining_time >= night_limit?return_time=remaining_time:return_time = remaining_time + 12
        //     }
        //     if(localStorage.getItem('_time_btn_hr') >= 6 && localStorage.getItem('_time_btn_hr') < 12){ 
        //         var rem_time = 12 - localStorage.getItem('_time_btn_hr')
        //         return_time=rem_time + 6
        //         // rem_time >= day_limit?return_time=(rem_time + 12) * hour_wheel_calc:return_time=(rem_time + 12) * hour_wheel_calc
        //     }
           
        // } 

        // if(localStorage.getItem('_time_mdn_time') == this.meridian_units[1]){
        //     var night_remaining_time = 6 - localStorage.getItem('_time_btn_hr')
        //     // generate daily
        //     if(localStorage.getItem('_time_btn_hr') < 6){
        //         var daytime_rem_hr = 6 - localStorage.getItem('_time_btn_hr')
        //         night_remaining_time >= day_limit?return_time=daytime_rem_hr:return_time=daytime_rem_hr + 12
        //     }
        //     if(localStorage.getItem('_time_btn_hr') >= 6 && localStorage.getItem('_time_btn_hr') < 12 ){
        //         var night_rem_time = 12 - localStorage.getItem('_time_btn_hr')
        //         return_time = night_rem_time + 6
        //     }
        // }
        // console.log(return_time)





            // if(this.output_hour >= 6 && this.output_hour < 12){ 
            //     const max_calculation = (12 - this.output_hour) + 6
            //     if(max_calculation >= day_limit){ 
            //         return max_calculation * hour_wheel_calc
            //         console.log(max_calculation)
            //     }
            //     if(max_calculation < day_limit){ 
            //         return (max_calculation + 12) * hour_wheel_calc
            //         console.log(max_calculation + 12)
            //     }

            // }
            // if(this.output_hour < 6){ 
            //     const night_max_calculation = 6 - this.output_hour
            //     if(night_max_calculation < night_limit){ 
            //         return (night_max_calculation + 12) * hour_wheel_calc
            //         console.log(night_max_calculation + 12)
            //     }
            //     return night_max_calculation * hour_wheel_calc
            //     console.log(night_max_calculation)
            // }


        // if(this.output_meridian == this.meridian_units[1]){ 
        //     if(this.output_hour <= 6){
        //         const calculate_remaining_time = 6 - this.output_hour
        //         if(calculate_remaining_time < day_limit){ 
        //             return (calculate_remaining_time + 12) * hour_wheel_calc
        //             console.log(calculate_remaining_time + 12)
        //         }
        //         return calculate_remaining_time * hour_wheel_calc
        //         console.log(calculate_remaining_time)
        //     }
        //     if(this.output_hour > 6 && this.output_hour <= 12){ 
        //         const calc_rem_time = (12 - this.output) + 6
        //         if(calc_rem_time < night_limit){ 
        //             console.log((calc_rem_time + 12) * hour_wheel_calc)
        //             return (calc_rem_time + 12) * hour_wheel_calc
        //             console.log(calc_rem_time + 12)
        //         }
        //         console.log(calc_rem_time * hour_wheel_calc)
        //         return calc_rem_time * hour_wheel_calc
        //         console.log(calc_rem_time)
        //     }

        //     // console.log(24 - (this.output_hour + 12) + 6)
        // }














// set_meridian_unit = (hours) => { 
// var time_expression = this.current_hour + hours

// switch(this.current_hour){ 
//     case(this.current_hour > 12?this.current_hour: null): 

//     break;
// }
// }




// }



	// const twelve_hour_time = () => { 
	// 	if(expiredHours > 12){ 
	// 		expiredHours = expiredHours - 12 
	// 		twelve_hour_time()
	// 	}
	// }
	// twelve_hour_time()

	// const set_meridiem = () => { 
	// 	var time_expression = currentTime.getHours() + hours
	// 	const start_meridiem = currentTime.getHours()

	// 	switch(start_meridiem){ 
	// 		case(start_meridiem > 12? start_meridiem: null):
	// 		start_time_unit = time_unit_[1]
	// 		break;
	// 		case (start_meridiem < 12 ? start_meridiem: null): 
	// 		start_time_unit = time_unit_[0]
	// 		break;
	// 	}



	// 	switch(time_expression){
	// 		case (time_expression >= 12 && time_expression <= 24 ? time_expression : null):
	// 			timeUnit = time_unit_[1]
	// 			break; 
	// 		case (time_expression > 24 || time_expression < 12 ? time_expression : null): 
	// 			timeUnit = time_unit_[0]
	// 			break;
	// 	}

	// 	if(expiredMinutes < 10){
	// 		expiredMinutes = `${0}${expiredMinutes}`
	// 	}
	// 	if(expiredMinutes == 60){ 
	// 		expiredHours = expiredHours + 1
	// 		expiredMinutes = '00'
	// 	}

	// }
	// set_meridiem()