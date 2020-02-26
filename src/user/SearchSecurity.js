import React, {Fragment, useState, useEffect, Component} from 'react';
import {getSymbols, list} from '../../core/Apicore';



const Search = () => {
    const [data, setData] = useState({
        securitySymbols: [],
        symbols: '',
        search: '',
        results: [],
        searched: false

    });


    const {securitySymbols,symbols, search, results, searched } = data;

    const loadSymbols = () => {
        getSymbols().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setData({...data, securitySymbols: data })
            }
        });
    };

    useEffect(() => {
        loadSymbols();
    }, []);

    const searchData = () => {
        console.log( symbols);
        if (symbols) {
            list( symbols)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                }else{
                    setData({...data, results: response, searched: true})
                }
            })
        }
        if (search) {
            list( search)
            .then(response => {
                if (response.error) {
                    console.log(response.error)
                }else{
                    setData({...data, results: response, searched: true})
                }
            })
        }
    }

    const searchSubmit = (e) => {
        e.preventDefault()
        searchData();
    };

    const handleChange = (name) => event => {
        setData({...data, [name]: event.target.value, searched: false});
    };

    const searchForm = () => {
        return(
            <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("symbols")}>
                            <option value="All">Pick Security Symbol</option>
                                {securitySymbols.map((s, i) => (<option key={i} value={s.symbol}>{s.securityName}</option>) )}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange("search")} placeholder="Search by name"></input>
                </div>
                <div className="input-group-prepend" style={{border: 'none'}}>
                        <button className="input-group-text">Search</button>
                </div>

            </span>
        </form>
        );
    };


return(
    <Fragment>
      
        <div className="container-fluid mt-3 mb-3">
            {searchForm()}
      
       </div>
    
       
       
    </Fragment>
);
};

export default Search


