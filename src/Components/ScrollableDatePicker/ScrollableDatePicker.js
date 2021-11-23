import { Component } from "react";
import Picker from 'react-scrollable-picker'
import './picker.css'



class ScrollableDatePicker extends Component {
    constructor(props) {
        super(props)
        this.date = new Date()
        this.state = {
            valueGroups: {
                date: '',
                hours: this.date.getHours()-12,
                minutes: this.date.getMinutes(),
                meridian: 'am'
            },
            optionGroups: {
                date: props.month,
                hours: props.hours,
                minutes: props.minutes == 0?'00':props.minutes,
                meridian: [
                    { value: 'am', label: 'am' },
                    { value: 'pm', label: 'pm' },
                ],
            },
        };

    }

    handleChange = (name, value, ) => {
        console.log(value)
        console.log(name)
        this.props.expired(name, value, this.state.valueGroups)
        this.setState(({ valueGroups }) => ({
            valueGroups: {
                ...valueGroups,
                [name]: value
            }
        }));
        
        // console.log(this.state.valueGroups)
    };

    render() {
        return (
            <div className='scrollPicker'>
            <Picker
                optionGroups={this.state.optionGroups}
                valueGroups={this.state.valueGroups}
                onChange={this.handleChange} />
            </div>

        )
    }
}

export default ScrollableDatePicker;

        // this.data = { 
        //     month: ['nov', 'dec'], 
        //     days: [1,2,3,4,5,6,7,8,9],
        //     hr: [1,2,3,4,5,6,7,8,9,10,11,12],
        //     mins: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,'00'], 
        //     meridian: ['am','pm']
        // }
// <div className='scrollableDatePicker_container'>
// <div id='scrollableDatePicker_wrapper'>  
// <div className='scroll_data'>
// <ul className='ul_list'> 
//     {
//         this.data.month.map((value, index) => { 
//             return(
//                 <li className='scollableSelection' key={index}>{value}</li>
//             )
//         })
//     }
// </ul>
// </div>
// <div className='scroll_data'>
// <ul className='ul_list'> 
//     {
//         this.data.hr.map((value, index) => { 
//             return(
//                 <li className='scollableSelection' key={index}>{value}</li>
//             )
//         })
//     }
// </ul>
// </div>
// <div className='scroll_data'>
// <ul className='ul_list'> 
//     {
//         this.data.mins.map((value, index) => { 
//             return(
//                 <li className='scollableSelection' key={index}>{value}</li>
//             )
//         })
//     }
// </ul>
// </div>
// <div className='scroll_data'>
// <ul className='ul_list'> 
//     {
//         this.data.meridian.map((value, index) => { 
//             return(
//                 <li className='scollableSelection' key={index}>{value}</li>
//             )
//         })
//     }
// </ul>
// </div>
// </div>
// </div>