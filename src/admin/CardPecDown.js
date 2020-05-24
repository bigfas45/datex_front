import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getVapSecDeals} from "./ApiAdmin";


const CardPecDown = ({sec, open}) => {


    let pecDown = open *  (1-0.1);


    return (

        <Fragment> {pecDown.toFixed(2)} </Fragment>

    );
};

export default CardPecDown;

