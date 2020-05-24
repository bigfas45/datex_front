import React, {useState, useEffect, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { getVapSecDeals } from "./ApiAdmin";


const CardVwap = ({sec, open}) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    let like = 0

    const init = () => {
        getVapSecDeals(sec.secSym).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setData(data);
            }
        });
    };
  
    useEffect(() => {
        init();
    }, []);

    return (

        <Fragment> 
            {data.map((d,i) => {
                let volume=0
                let value=0
                let vwapCal=0
                let price=0
                let pecUp= open * 1.1;
                let pecDown= open * (1- 0.1)

                volume = d.volume
                value = d.value

              

                if(volume >= 5000){
                    vwapCal = (value/volume).toFixed(2);
                    if( vwapCal <=pecDown || vwapCal <= pecUp   ){
                        price = vwapCal
                    }else{
                        price = open
                    }
                }else if(volume < 5000){
                    price = open
                }

                return(
                    <Fragment>  {price}   </Fragment>
                )
            })}
        </Fragment>

    );
};

export default CardVwap;
