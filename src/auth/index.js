import { API } from "../config";



export const signup =  (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
     });
}



export const signin =  (user) => {
    // console.log(name, email, password);
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json()
    })
    .catch(err => {
        console.log(err);
     });
};


export const authenticate = (data, next) => {

    if(typeof window !== 'undefined'){
        localStorage.setItem('jwtNasdPortal', JSON.stringify(data))
        next();
    }
};


export const signout = (next) => {
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwtNasdPortal');
        next();
        return fetch(`${API}/signout`, {
            method: "GET",
        })
        .then(response => {
            console.log('signout', response)
        })
        .catch(err => console.log(err));
    }
};


export const isAuthenticated = () => {
    if(typeof window == 'undefined'){
        return false
    }
    if(localStorage.getItem('jwtNasdPortal')){
        return JSON.parse(localStorage.getItem('jwtNasdPortal'))
    }else{
        return false;
    }
}

