import React, { useContext, useEffect, useState } from 'react'
import { PaymentContext } from '../Context/PaymentContext'
import { withRouter, useHistory } from 'react-router-dom'
import Header from '../Components/Header/Header'


const GuestDataCapture = (props) => {
    const history = useHistory()
    const { setUserInfo, darkMode } = useContext(PaymentContext)
    const [darkModeStyle, setDarkModeStyle] = useState({
        globalContainer: 'global_container',
        buttonStyle: 'submitBtn',
        color: '#585858'

    })

    const [license, setLicense] = useState({
        lp: ''
    })

    const changeTxt = (e) => { 
        setLicense({...license, 'lp': e.target.value.split(' ').join('')})
    }



console.log(license)
 
    useEffect(() => {
        localStorage.setItem('backbutton', false)
        if (darkMode >= 1800 || darkMode <= 600) {
            setDarkModeStyle({
                globalContainer: 'global_container_dark',
                buttonStyle: 'submitBtn_dark',
                color: 'white'

            })
        }
    }, [])

    const submitedDataCapture = (e) => {
        e.preventDefault()
        localStorage.setItem('fullname', e.target.name.value)
        localStorage.setItem('phone', e.target.phone.value)
        localStorage.setItem('license', e.target.license.value)
        setUserInfo({
            name: e.target.name.value,
            phone: e.target.phone.value,
            license: e.target.license.value
        })
        history.push(`/select-payment/`)
    }
    const lotNumber = localStorage.getItem('lot')

    const terms_onclick = () => { 
        history.push('/terms/')
    }

    return (
        <>
		<Header home={false}/>
        <div className={`${darkModeStyle.globalContainer} choose_lot`}>
            <div className='content_holder'>
                <h1 className='WelcomeHeadder' style={{ textAlign: 'center', color: darkModeStyle.color }}>Welcome to Lot Location<br /> <strong>{lotNumber}</strong></h1>
                <form className='form' onSubmit={submitedDataCapture}>
                    <label style={{ color: darkModeStyle.color}} className='labels'>Full Name</label>
                    <input name='name' required></input>
                    <label style={{ color: darkModeStyle.color }} className='labels'>Phone Number</label>
                    <input name='phone' required></input>
                    <div className='licensePlateHolder'>
                        <div className='licensePlate'>
                            <div className='threeSeparations'>
                                <div className='lPlateDot'></div>
                                <div className='lPlateDot'></div>
                            </div>
                            {/* License plate entry */}
                            <div className='line'></div>


                            <div className='plateInput'>

                                <div>
                                    <div className='center'>
                                        <label style={{ color: darkModeStyle.color }} className='labels'>Enter License Plate</label>
                                    </div>

                                    {/* <h3>Enter License Plate</h3> */}
                                    <div className='center'>
                                        <input required name='license' className='licensePlateInput' maxlength="7" onChange={(e)=>{changeTxt(e)}} value={license.lp} style={{textTransform:"uppercase"}}></input>
                                    </div>

                                </div>

                            </div>


                            <div className='line'></div>
                            <div className='threeSeparations'>
                                <div className='lPlateDot'></div>
                                <div className='lPlateDot'></div>
                            </div>


                        </div>
                    </div>
                    {/* <label className='labels'>License Plate #</label> */}
                    {/* <input></input> */}
                    <input className={darkModeStyle.buttonStyle} type='submit'></input>
                    <div className='tc_holder'>
                    <button onClick={terms_onclick} className='terms_condition'>Terms & Conditions</button>
                    </div>

                </form>


            </div>

        </div>
        </>
    )
}
export default withRouter(GuestDataCapture);