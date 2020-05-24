import React, {Fragment} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {getVapSecDeals} from "./ApiAdmin";


const CardPecUp = ({sec, open}) => {


    let pecUp = open * 1.1;


    return (

        <Fragment> {pecUp.toFixed(2)} </Fragment>

    );
};

export default CardPecUp;

