import React from 'react'
import './Notifier.css'
import gsap from 'gsap'


/**
* @author
* @function Notifier
**/

export const Notifier = ({notification, func}) => {
    func(null)
  return(
    <>
    <div className='notification_wrapper'>
        <h5>{notification}</h5>
    </div>
    </>
   )

 }