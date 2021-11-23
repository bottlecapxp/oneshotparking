import { Component } from 'react'



class MaxSelection extends Component {
    constructor(props) {
        super(props)
        this.date = new Date()
        this.getExpTime = (localStorage.getItem('expTime')?localStorage.getItem('expTime').split(':'):'')
        this.hours = this.getExpTime[0]
        this.hour = this.date.getHours()
        this.minutes = this.date.getMinutes()
        this.localStorateMax = localStorage.getItem('max')
        this.max_num = 0.00

    }


    // init_check = () =>{ 
    //     if (this.localStorateMax == 0) {
    //         console.log('localStorage = 0')
    //                     switch (this.hour) {
    //                     case(this.hour < 18 && this.hour >6):
    //                         const remaining_time = this.hour
    //                         this.max_num = parseFloat(`0.0${remaining_time}`)
    //                         break;
    //                     case (this.hour >= 18 && this.hour < 24 ?):
    //                         const rem_time = (24 - this.hour) + 6
    //                         this.max_num = (rem_time > 9 ? this.max_num = parseFloat(`0.${rem_time}`) : parseFloat(`0.0${rem_time}`))
    //                         break;
    //                     case(this.hour <6):
    //                         const rem_hr = this.hour
    //                         this.max_num = `0.0${rem_hr}`

    //                         break;
    //                 }
    //                     
    //     }
    // }

    // seconds_calculation = () =>{ 
    //     this.hours * 3600
    //     this.mins * 60
    //     return  (this.hours)
    // }

    set_conditions = (num) => {
        switch(num){ 
            case (num < 18 && num > 6?this.hour:''):
                const remaining_time = this.hour
                if (this.hours == this.hour) {
                    this.max_num = parseFloat(`0.0${remaining_time}`)
                }else{ 
                    this.max_num = 0.12
                }
            break;
            case(this.hour >= 18 && this.hour < 24?this.hour:''):
                const rem_time = (24 - this.hour) + 6
                if (this.hours == this.hour) {
                    this.max_num = (rem_time > 9 ? this.max_num = parseFloat(`0.${rem_time}`) : parseFloat(`0.0${rem_time}`)) 
                }else{ 
                    this.max_num = 0.12
                }
            break;
            case(this.hour < 6?this.hour:''):
                const rem_hr = this.hour
                this.max_num = 0.12
                if (this.localStorateMax == 1) {
                    this.max_num = 0.12
                }
            break;
            
        }
       
        console.log(this.max_num)
        return this.max_num

    }
}

export default MaxSelection;

        // if (this.localStorateMax == 0) {
        //     this.init_check()
        //     console.log('sero')
        // }
        // else if(this.localStorateMax == 1){ 

        //     this.max_num = '0.12'

        // }

		// get the localstorage exp time and match it with 6
		// if match, we're going to assign the this.max_num variable to 12
		// if it is not 6, then we're going to switch case and return the result to this.max_num
	// 	if (localStorage_ == 1) {
	// 		this.max_num = '0.12'
	// 		console.log('still shows under condition')
	// 	}
	// 	if (localStorage_ = 0){ 

	// 		console.log('Not equal to 6')
	// 	}
	// }
