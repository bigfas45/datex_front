import { API } from "../config";

export const createSecurity = (userId, token, symbol) => {
  // console.log(name, email, password);
  return fetch(`${API}/nasd/security/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(symbol)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err);
    });
};


export const createAnnualReport = (userId, token, report) => {
    // console.log(name, email, password);
    return fetch(`${API}/nasd/annualreport/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: report
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };


  export const getSecurities = () => {
    return fetch(`${API}/nasd/security`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

  /**
   * to perform crud on report
   * get all report
   * get a single report
   * update single report
   * delete single report
   */


  export const getReports = () => {
    return fetch(`${API}/nasd/annualreport/`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };



  export const deleteReport = (reportId, userId, token) => {
    // console.log(name, email, password);
    return fetch(`${API}/nasd/annualreport/${reportId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
  
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };


  export const getReport = (reportId) => {
    return fetch(`${API}/nasd/annualreport/${reportId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };


  export const updateReport = (reportId, userId, token, report) => {
    // console.log(name, email, password);
    return fetch(`${API}/nasd/annualreport/${reportId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: report
  
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };





  export const getUserList = ( userId2, token) => {
    // console.log(name, email, password);
    return fetch(`${API}/users/${userId2}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };


  export const deleteUser = (itemId, userId, token) => {
    // console.log(name, email, password);
    return fetch(`${API}/users/delete/${itemId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
  
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };



  export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };




  
  export const updateUser = (updateUserId, userId, token, user) => {
  
    return fetch(`${API}/user/${updateUserId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(user)
  
    })
      .then(response => {
        return response.json();
      })
      .catch(err => {
        console.log(err);
      });
  };




  
