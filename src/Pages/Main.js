import React, {useContext, useEffect, useState} from 'react'
import {PaymentContext} from '../Context/PaymentContext'
import '../Pages/pages.css'
import ChooseAccount from '../Components/Cards/Choose_Account/ChooseAccount'

const Main = (props) => {
    const {darkMode} = useContext(PaymentContext)
    const [darkModeStyle, setDarkModeStyle] = useState({
        globalContainer: 'global_container', 
        createNewAccount: 'new_member_link'
    })


useEffect(()=>{
    if(darkMode >= 1800 || darkMode <= 600){
        setDarkModeStyle({
            globalContainer: 'global_container_dark',
            createNewAccount: 'new_member_link_dark'
        })
    }
    if(darkMode < 1800 || darkMode > 600){
        setDarkModeStyle({
            globalContainer: 'global_container',
            createNewAccount: 'new_member_link'
            
        })
    }
}, [])

// if(localStorage.getItem('lot') === null){
//     // localStorage.setItem('lot', 4001)
//     localStorage.setItem('lot', props.match.params.lot)
// }
// else if(localStorage.getItem('lot') != null){
// localStorage.removeItem('lot')
// setTimeout(()=>{
//     localStorage.setItem('lot', props.match.params.lot)
// }, 10)
// }


    return(
        <div className={`${darkModeStyle.globalContainer} choose_lot`}>
            <div id='choose_account_holder'>
            <ChooseAccount title='Express Parking' id='0' url='set-time'/>
            {/* <ChooseAccount title='Sign In' id='1' url='#'/> */}
            {/* <p id={darkModeStyle.createNewAccount}>Create New Account</p> */}
            </div>
        </div>
    )
}

export default Main;