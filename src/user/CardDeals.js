import React, { useState, useEffect, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { getCompaniesVolume } from '../core/Apicore';

const CardDeals = ({ symbol }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  let like = 0;

  const init = () => {
    getCompaniesVolume(symbol).then((data) => {
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
      {data.map((d, i) => {
        return <Fragment> {d.DEALS} </Fragment>;
      })}
    </Fragment>
  );
};

export default CardDeals;
