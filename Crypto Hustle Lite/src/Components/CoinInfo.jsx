import React from 'react'
import {useState, useEffect} from 'react'

const CoinInfo = ({id, image, name, symbol, price}) => {

    return (
        <>  
            <div className="coin-info">
                {price ? (
                    <p>{price}</p>
                ) : null}
            </div>
            <ul>
                    <li className='main-list' key={id}>
                        <img 
                            className='coin-image'
                            src={image}
                            alt={`Small icon for ${name} crypto coin`}
                        />
                        {name} <span className="tab"></span>
                        {price != null ? `$${price} USD` : null}
                    </li>


            </ul>
        
        
        
        </>
    )

}


export default CoinInfo;