import { Component } from 'react'
import PaymentGenerator from '../Financials/Calculator/PaymentGenerator'
import Tick from '../../Assets/tick.mp3'
import { Howl, Howler } from 'howler'

// const pGenerator = new PaymentGenerator()

class TimerLogic extends Component {
    constructor(props) {
        super(props)
        this.hour = 0
        this.stagedMinutes = 0
        this.value = 0.0
    }


    setValue = valFunc => {
        this.value = valFunc
    }

    stepValue = v => {
        if (v > 1) {
            return 1
        } else {
            return Math.round(v * 24) / 24
        }
    }


    scrollTime = stepVal => {
        var givenValue = Math.round(stepVal * 24)
        // minutes is the stepVal % by 0.0417
        var convert_to_stepVal = givenValue * 0.041666666666666664
        const min_calc = Math.round((stepVal - convert_to_stepVal) / 0.000695)
        if(min_calc < 0){ 
            this.stagedMinutes = -(-60 -min_calc)
        }else if(min_calc == -1 || min_calc == 1){
            this.stagedMinutes = 0
        }
        else{
            this.stagedMinutes = (min_calc < 10 && min_calc > 0?`0${min_calc}`: min_calc )
        }
       

        // this.stagedMinutes = min_calc < 0? -(-60 -min_calc) : min_calc //having issues using the % sign. Possibly because we're trying to round a fraction of a fraction String seems to work for now. not the ideal for long term
        // console.log(convert_to_stepVal)
        // console.log(stepVal)
        this.hours = (parseInt(stepVal / 0.041666666666666664) == 0? parseInt(this.stagedMinutes / 10):parseInt(stepVal / 0.041666666666666664) )
        // console.log(`hours: ${this.hours}`)
        // console.log(`minutes: ${min_calc}`)
        // console.log(`stepVal: ${stepVal}`)
        PaymentGenerator(this.hours, this.stagedMinutes)

        //Sound generator      
        const sound = new Howl({
            src: [Tick],
            volume: 0.6
        })
        sound.play()
        // console.log(min_calc)
        return (
            parseInt(`${this.hours}${this.stagedMinutes <= 0 ? '00' : this.stagedMinutes}`)
        )

    }











} // End of Class

export default TimerLogic

// if(min_calc < 0){ 
//     this.stagedMinutes = -(-60 -min_calc)
// }else if(min_calc == -1){
//     this.stagedMinutes = 0
// }
// else{
//     this.stagedMinutes = min_calc
// }


// minutes =  Math.round(6000 * givenValue / 100)

        // // get hours
        // if (minutes > 60){
        //     this.hours = Math.floor(minutes / 100)
        // } else if(minutes / 60 === 1){
        //     this.hours = 1
        // }else{
        //     this.hours = 0
        // }
        // // First Check if you're at a full hour
        // if(minutes === 60 || (minutes / 60) === this.hours){
        //     this.stagedMinutes = '00'
        // }
        // // Else run algorithm
        // else{
        //  this.stagedMinutes = (minutes % 60 % 100)
        // }


// var sound = new Howl({
//     src: [Tick], 
//     volume: 0.7
// })