import React, {useContext, useEffect, useState} from 'react'
// import {PaymentContext} from '../../Context/PaymentContext'
import Logo from '../../Assets/logo.svg'
import DarkModeLogo from '../../Assets/darkModeLogo.svg'
import '../Header/Header.css'
import {useHistory} from 'react-router-dom'
import { defaultProps } from 'react-circular-input/dist/CircularTrack'


 const Header = (props) => {
     const history  = useHistory()
    // const {darkMode} = useContext(PaymentContext)
    const darkMode = 1800
    const [darkModeStyle, setDarkModeStyle] = useState({
        headerStyles: 'hamburger_menu', 
        logo: Logo
    })
const back = () =>{
    window.history.back()
}

useEffect(()=>{
    if(darkMode >= 1800 || darkMode <= 600){
        setDarkModeStyle({
            headerStyles: 'hamburger_menu_dark',
            logo: DarkModeLogo
        })
    }
    if(darkMode < 1800 || darkMode > 600){
        setDarkModeStyle({
            headerStyles: 'hamburger_menu',
            logo: Logo
            
        })
    }
}, [])
    return (
        <div id='header'>
            {
               props.home
               ?''
               :
               <button className='back_button' onClick={()=>{back()}}>Back</button>
            }

            <div className='header_containers'></div>
            <div className='logo'>
                <img id='logo_img' src={darkModeStyle.logo} alt='logo'></img>
            </div>
            <div className='header_containers'>

                {/* <div id='hamburger_container'>
                <div className={darkModeStyle.headerStyles}></div>
                <div className={darkModeStyle.headerStyles}></div>
                <div className={darkModeStyle.headerStyles}></div>
                </div> */}

            </div>

        </div>
    )
}
export default Header;
