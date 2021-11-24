import React, {useState, useEffect} from 'react'
import '../Choose_Account/main.css'
import { withRouter } from "react-router-dom";


const ChooseAccount = (props) => {
    // const history = useHistory();
        // const {darkMode} = useContext(PaymentContext)
        const darkMode = 1800
        const [darkModeStyle, setDarkModeStyle] = useState({
            chooseAccountStyles: 'account_card'
        })
    
    
    useEffect(()=>{
        if(darkMode >= 1800 || darkMode <= 600){
            setDarkModeStyle({
                chooseAccountStyles: 'account_card_dark'
            })
        }
        if(darkMode < 1800 || darkMode > 600){
            setDarkModeStyle({
                chooseAccountStyles: 'account_card'
                
            })
        }
    }, [])

    const [selected_option] = useState({
        title: props.title,
        url: props.url,
        id: props.id
    })

    const Customers_choice = () =>{
        if(selected_option.id === '0'){
            props.history.push(`/${selected_option.url}/`)
        } else if(selected_option.id === '1'){
            // window.reload.location

        }
    }

    return (
        <div className='box-shadow' id={darkModeStyle.chooseAccountStyles} onClick={Customers_choice}>
            <p id='title'>{props.title}</p>
        </div>
    )
}

export default withRouter(ChooseAccount);