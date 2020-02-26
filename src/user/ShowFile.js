import React from 'react';
import {API} from '../config';
import { Link } from 'react-router-dom';


const ShowFile = ({item, url}) => (

    <a href={`${API}/${url}/report/${item._id}`}>Download</a>

    // <Link to= >Download</Link>
);


export default ShowFile

  

