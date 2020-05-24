import React, {useState, useEffect, Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { getVapSecDeals } from "./ApiAdmin";


const Deals = ({sec}) => {

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
                return(
                    <Fragment>  {d.count}   </Fragment>
                )
            })}
        </Fragment>

    );
};

export default Deals;
