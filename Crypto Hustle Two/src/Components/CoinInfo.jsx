import React from 'react'
import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

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
                        <Link
                            style={{ color: "white" }}
                            to={`/CoinDetails/${symbol}`}
                            key={symbol}
                        >
                            <img 
                                className='coin-image'
                                src={image}
                                alt={`Small icon for ${name} crypto coin`}
                            />
                            {name} <span className="tab"></span>
                            {price != null ? `$${price} USD` : null}
                        </Link>
                    </li>
            </ul>
        
        
        
        </>
    )

}


export default CoinInfo;