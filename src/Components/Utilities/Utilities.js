import { Component } from "react";



class Utilities extends Component{
    constructor(props){
        super(props)
    }


round = (limit, set_target, true_value) =>{ 
    const output = Math.round((limit - set_target) / true_value)
    return output
}

overlap_limit = (limit, next_hr, acc_time, rate) => {
    const newDate = new Date()
    const mins = newDate.getMinutes()
    const output = parseFloat(acc_time > limit && acc_time < next_hr? mins * rate: 0).toFixed(2)
    return output
}



}

export default Utilities;