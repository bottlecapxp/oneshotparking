import React from 'react'
import { useHistory } from 'react-router'

/**
* @author
* @function DailyParking
**/

export const DailyParking = (props) => {
    const history = useHistory()
    const daily_parking_page = () => { 
        history.push(props.link)
    }
  return(
    <button className='global_circle_btns title' onClick={daily_parking_page}> 
    24Hr+
    </button>
   )

 }
 export default DailyParking;