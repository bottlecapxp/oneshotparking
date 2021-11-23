import React, {useState, useContext} from 'react'
import './Receipt.css'
import {PaymentContext} from '../../Context/PaymentContext'

/**
* @author
* @function Receipt
**/

const Receipt = (props) => {
const date = new Date()
const {userInfo, totalbilling, expiredTime, startTime} = useContext(PaymentContext)
const location = localStorage.getItem('lot')
const fullname = localStorage.getItem('fullname')
const license = localStorage.getItem('license')
const start_time = localStorage.getItem('startTime')
const expired_time = localStorage.getItem('expTime')
const total = localStorage.getItem('total')
const data = `${date.getFullYear()}/${date.getMonth()}/${date.getUTCDate()}`
const number = localStorage.getItem('phone')
const [receipStyling, setReceiptStyling] =useState({
wrapperStyling: { 
    width: '60%', 
    height: 'auto',
    backgroundColor: '#EEEEF1',
    position: 'absolute', 
    color: '#848484',
    padding: '20px', 
    borderRadius: '20px',
    zIndex: '20',
    marginTop: '-30%',  
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '21px'
}
})
const text_data = {
    'name': fullname, 
    'license_plate': license, 
    'start_time': start_time,
    'exp_time': expired_time, 
    'cost': total, 
    'total': total, 
    'location': 'OneShot Parking', 
    'lot': location, 
    'date': data, 
    'number': number
}


const send_receipt = () =>{
    fetch('https://osParking.pythonanywhere.com/send-receipt', {
        method: 'POST', 
        mode: 'cors',
        headers: { 
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(text_data)
    })
    .then((promise)=> promise.json())
    .then((data) => { 
        console.log(data)
    })
}

  return(
    <div style={receipStyling.wrapperStyling}>
        <div className='exit_container'> 
            <button className='close_receipt_btn' onClick={props.close}>X</button>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Name:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>{fullname}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>License Plate:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>{license}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Start Time:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px' }}>{start_time}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Expired Time:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>{expired_time}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Price:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>${total}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Total:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>${total}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Location:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>OneShot Parking</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Lot #:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>{location}</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{marginBottom: '0px'}}>Date:</h4>
            <p style={{marginLeft: '20px', marginBottom: '0px'}}>{data}</p>
        </div>
        <button onClick={send_receipt} className='Send_receipt_copy'>Get a Copy</button>
        
    </div>
   )

 }

export default Receipt