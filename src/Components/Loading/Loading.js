import React, {useState} from 'react'
import imgLoading from '../../Assets/loading.gif'

/**
* @author
* @function Loading
**/



const Loading = (props) => {
    const [loading, setLoading] = useState({
        divStyle: { 
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }, 
        imageStyle: { 
            width: '55%'
        }
    })

  return(
    <div style={loading.divStyle} className='loadingGif'>
    <img style={loading.imageStyle} src={imgLoading} alt="loading"></img>
    <h4>Loading...</h4>
    </div>
   )

 }

export default Loading