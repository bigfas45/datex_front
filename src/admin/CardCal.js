import React, {useState, useEffect, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { getVapSecDeals } from "./ApiAdmin";


const CardCal = ({sec}) => {

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

                volume = d.volume
                value = d.value
                vwapCal = value/volume

                return(
                    <Fragment>  {vwapCal.toFixed(2)}   </Fragment>
                )
            })}
        </Fragment>

    );
};

export default CardCal;
