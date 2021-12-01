import React, {useContext, useEffect, useState} from 'react'
import {PaymentContext} from '../Context/PaymentContext'
import PaymentButtons from '../Components/Buttons/PayOptions/PaymentButtons'
import Google from '../Assets/Google.svg'
import CreditCardIcon from '../Assets/ccIcon.svg'
import Apple from '../Assets/Apple.png'
import Header from '../Components/Header/Header'
import WApple from '../Assets/Apple_logo_white.png'



const  Selectmethod = () =>{
    
const { darkMode } = useContext(PaymentContext)
const [darkModeStyle, setDarkModeStyle] = useState({
    globalContainer: 'global_container', 
    color: '#585858', 
    class: 'paymentButton', 
    apple: Apple
  
    
})
useEffect(()=>{
    if(darkMode >= 1800 || darkMode <= 600){
        setDarkModeStyle({
            globalContainer: 'global_container_dark',
            color: 'white',
            class: 'paymentButton_dark',
            apple: WApple
            
        })
    }
}, [])

return(
<>
<Header home={false}/>
<div className={`${darkModeStyle.globalContainer} choose_lot`}>
<div className='stacked_container'>
<h1 style={{color: darkModeStyle.color}} className='global_content_title slim'>Choose a payment method</h1>

<div className='position-center'>
<div className='stacked'>

<PaymentButtons title='Google' image={Google} color={darkModeStyle.color} classStyle={darkModeStyle.class}/>
<PaymentButtons title='Apple' image={darkModeStyle.apple} color={darkModeStyle.color} classStyle={darkModeStyle.class}/>
<PaymentButtons title='Pay by Card' image={CreditCardIcon} color={darkModeStyle.color} classStyle={darkModeStyle.class}/>

</div>
</div>

</div>

</div>
</>
)

}

export default  Selectmethod; 