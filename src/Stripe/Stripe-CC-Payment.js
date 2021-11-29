import React, { useState, useContext, useEffect } from 'react'
import { PaymentContext } from '../Context/PaymentContext'
import { CardNumberElement, CardCvcElement, CardExpiryElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Lock from '../Assets/lock.png'
import CreditCardIcon from '../Assets/ccIcon.svg'
import '../Pages/pages.css'
import Loading from '../Components/Loading/Loading'
import { withRouter, useHistory } from 'react-router-dom'
import bodyParser from 'body-parser'


const StripePayment = () => {
    // using state to keep track of stripe payment, show errors, and manange user interface
    const stripe = useStripe()
    const elements = useElements()
    const history = useHistory()


    const [success, setSuccess] = useState(false)
    const [status, setStatus] = useState({
        status: "Enter your card's information below"
    })
    const [processing, setProcessing] = useState('')
    const [disabled, setDisabled] = useState(true)
    const [clientSecret, setClientSecret] = useState('')
    const { userInfo, totalbilling, darkMode } = useContext(PaymentContext)
    const [isPaymentLoading, setPaymentLoading] = useState(false)
    const [darkModeStyle, setDarkModeStyle] = useState({
        globalContainer: 'global_container',
        color: '#585858',
        submitBtn: 'submitBtn',
        card: 'card_'
    })

    const api_data = {
        'fullname': localStorage.getItem('fullname'),
        'license_plate': localStorage.getItem('license'),
        'set_time': localStorage.getItem('startTime'),
        'exp_time': localStorage.getItem('expTime'),
        'location_id': localStorage.getItem('lot'),
        'paid': localStorage.getItem('total')
    }

    useEffect(() => {
        if (darkMode >= 1800 || darkMode <= 600) {
            setDarkModeStyle({
                globalContainer: 'global_container_dark',
                color: 'white',
                submitBtn: 'submitBtn_dark',
                card: 'card_dark'
            })
        }

    }, [darkMode])

    const CARD_ELEMENT_OPTIONS = {
        style: {
            base: {
                color: 'black' 
            }
        }
    }


    const calc_stripe_amount = (amount) => { 
        const split_amount = amount.toString().split('.')
        const output  = parseInt(`${split_amount[0]}${split_amount[1] < 10?`${split_amount[1]}0`:split_amount[1] }`)
        return output
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!stripe || !elements) { 
            //Stripe JS has not been loaded. Disable form submisison
            return;
        }
        // We need to fetch the client secrete from the Server 
        // in order to confirmCardPayments
          await fetch("https://osParking.pythonanywhere.com/create-payment-intent", { 
                method: 'POST', 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({ 
                    amount: calc_stripe_amount(api_data.paid), 
                    description: `Purchased by ${api_data.fullname} owner of ${api_data.license_plate}. Can be contacted at 6470001111`,    
                }),
            }).then((res) => res.json())
            .then((data) => { 
                setClientSecret(data.clientSecret) 
            })
  

        console.log(` New Secret: ${clientSecret}`)

        setPaymentLoading(true)
        const paymentResult = await stripe.confirmCardPayment(clientSecret, { 
            payment_method: { 
                card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
                billing_details: {
                    name: "Decory Herbert"
                }
            }
        })
        setPaymentLoading(false)
        if(paymentResult.error){ 
            alert(paymentResult.error.message)
            console.log(paymentResult.error.message)
        }else{ 
            if(paymentResult.paymentIntent.status === "succeeded")
            setSuccess(true)
            setTimeout(()=> { 
                history.push('/remaining-time/')
            }, 2000)
        }


    } // end of handle submit


    const msg_data = {
        'number': localStorage.getItem('phone'),
    }
    
    const send_message = async () => {
        if(success){
            await fetch('https://osparking.pythonanywhere.com/on-payment', {
                method: 'POST', 
                mode: 'cors', 
                headers: {
                    'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(msg_data)
            })
            .then((promise) => promise.json())
            .then((data) => {
                console.log(data)
            })
        }

    }
    send_message()


    return (
        <>
            <div className={`${darkModeStyle.globalContainer} choose_lot`}>
                {stripe ?

                    <div>
                        <h1 className='global_content_title slim' style={{ textAlign: 'center', marginTop: '-50%', color: darkModeStyle.color }}>{status.status}</h1>
                        <form onSubmit={handleSubmit} className={darkModeStyle.card}> {/* this should be a form */}
                            {/* Enter your card numner */}
                            <div className='stacked_'>
                                {/* darkModeStyle.color */}
                                <label style={{ color: 'black' }} id='CCnumberLabel'>Enter Your Card Number</label>
                                <div id='CCnumber'>
                                    <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
                                </div>
                            </div>
                            {/* Expiration CVC & Icon */}
                            <div className='auth_holder'>
                                <div className='stacked_'>
                                    <label style={{ color: darkModeStyle.color }}>Expiration</label>
                                    <div id='expiration'>
                                        <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                                    </div>

                                </div>
                                <div className='stacked_'>
                                    <label style={{ color: darkModeStyle.color }}>CVC</label>
                                    <div id='cvc'>
                                        <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                                    </div>
                                </div>
                                <div>
                                    <img className='ccIcon' src={CreditCardIcon} alt='creditCard_logo'></img>
                                </div>
                            </div>
                            <div className='securePaymentHolder'>
                                <div className='securePayment_'>  {/* display flex */}
                                    {/* image */}
                                    <img className='lock' src={Lock} alt='lock'></img>
                                    <p style={{ color: darkModeStyle.color }}>Secure Payment</p>
                                    {/* text info */}
                                </div>
                            </div>

                            {/* Button here */}
                            <div className='ccCardSubmissionHolder'>
                                <input style={success ? { backgroundColor: 'green', color: 'white', fontWeight:'bold' ,border: '1px solid green !important' } : { color: '#FF5759', border: '1px solid #FF5759 !important' }} className={`${darkModeStyle.submitBtn} ccCardSubmission`} type='submit' value={success ? 'Approved!' : 'Pay Now'}></input>
                            </div>


                        </form>
                    </div>
                    :
                    <Loading />
                }
            </div>
        </>
    )
}
export default StripePayment;

        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: element.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        // })

        // if (!error) {
        //     try {
        //         setTimeout(() => {
        //        
        //         }, 2000)
        //         setSuccess(true)
        //         // const { id } = paymentMethod

        //         fetch('https://osparking.pythonanywhere.com/visitor', {
        //             method: 'POST',
        //             mode: 'cors',
        //             headers: {
        //                 'Access-Control-Allow-Origin':'*',
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify(api_data)
        //         }).then(response => response.json())
        //             .then(data => {
        //                 console.log('Success:', data);
        //             })
        //             .catch((error) => {
        //                 console.error('Error:', error);
        //             });


        //     } catch (error) {
        //         // Change the title information
        //         setStatus({
        //             status: error
        //         })
        //     }
        // }




        // const { error, paymentMethod } = await stripe.createPaymentMethod({
        //     type: 'card',
        //     card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        // })