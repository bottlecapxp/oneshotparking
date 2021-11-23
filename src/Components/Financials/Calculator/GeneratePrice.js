import { Component } from 'react'




class GeneratePrice extends Component {
    constructor(props) {
        super(props)
        this.day_output = 0
        this.night_output = 0
        this.extra_output = 0
    }

    calculate_daytime_payments = (dayTime, rate, limit, max_cost, overflow_cost) => {
        var daytime = dayTime
        return daytime >= limit ? max_cost : eval((daytime * rate) + eval(overflow_cost == undefined ? 0 : overflow_cost))
    }
    calculate_nighttime_payments = (nightTime, rate, limit, max_cost, overflow_cost) => {
        var nighttime = nightTime
        return nighttime >= limit ? max_cost : eval((nighttime * rate) + eval(overflow_cost == undefined ? 0 : overflow_cost))
    }
    calculate_extratime_payments = (extraTime, rate, limit, max_cost, overflow_cost) => {
        var extratime = extraTime
        return extratime >= limit ? max_cost : eval((extratime * rate) + eval(overflow_cost == undefined ? 0 : overflow_cost))

    }

    // max 
    max_calculate_daytime_payments = (dayTime, rate, limit, max_cost) => {
        var daytime = dayTime
        return daytime >= limit ? max_cost : daytime * rate
    }
    max_calculate_nighttime_payments = (nightTime, rate, limit, max_cost) => {
        var nighttime = nightTime
        console.log(nightTime)
        return nighttime >= limit ? max_cost : nighttime * rate
    }
    max_calculate_extratime_payments = (extraTime, rate, limit, max_cost) => {
        var extratime = extraTime
        return extratime >= limit ? max_cost : extratime * rate

    }

}

export default GeneratePrice;