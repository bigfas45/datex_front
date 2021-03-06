import { API } from "../config";
import queryString from "query-string";

export const ticker = () => {
  return fetch(`${API}/ticker`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const MarketIndexT = () => {
  return fetch(`${API}/MarketIndexT`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const MarketIndexY = () => {
  return fetch(`${API}/MarketIndexY`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const LiveTrade = () => {
  return fetch(`${API}/liveTrade`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const ParticipantsLogin = () => {
  return fetch(`${API}/participantsLogin`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const Usi = () => {
  return fetch(`${API}/usi`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const Live = () => {
  return fetch(`${API}/live`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getVwap = secerityCode => {
  return fetch(`${API}/vwap/${secerityCode}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const InboxD = () => {
  return fetch(`${API}/inboxDate`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getInbox = date => {
  return fetch(`${API}/getInbox/${date}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getTradeReports = (date) => {
  return fetch(`${API}/getInboxTradeReport/${date}/${date}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getSymbols = () => {
  return fetch(`${API}/security/symbol`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const list = data => {
  // const query = queryString.stringify(params)
  // console.log(data)
  return fetch(`${API}/security/${data}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const chartList = data2 => {
  // console.log(data2)
  return fetch(`${API}/security/chart/${data2}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const securityMcap = dataMcapS => {
  console.log(dataMcapS);
  return fetch(`${API}/security/mcap/${dataMcapS}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const securityTtrade = dataTtrades => {
  console.log(dataTtrades);
  return fetch(`${API}/security/totalTrade/${dataTtrades}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const securityTvolume = dataTvolume => {
  console.log(dataTvolume);
  return fetch(`${API}/security/totalDeals/${dataTvolume}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const performanceStart = start => {
  return fetch(`${API}/security/performanceStart/${start}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const performanceEnd = end => {
  return fetch(`${API}/security/performanceEnd/${end}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const performanceStartSecurity = startSecurity => {
  return fetch(`${API}/security/performanceStartSecurity/${startSecurity}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const performanceEndSecurity = (startSecurity, endSecurity) => {
  return fetch(
    `${API}/security/performanceEndSecurity/${startSecurity}/${endSecurity}`,
    {
      method: "GET"
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const dataTableTest = () => {
  return fetch(`${API}/ticker`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const equity = () => {
  return fetch(`${API}/equity`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const companies = () => {
  return fetch(`${API}/security/companies/research`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const priceList = () => {
  return fetch(`${API}/equity/priceList`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const yearTrade = () => {
  return fetch(`${API}/equity/year`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const summaryMonthly = (start, end) => {
    return fetch (`${API}/equity/monthly/${start}/${end}`, {
        method: "GET"
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
}


export const TSumYearTrade = (start, end) => {
  return fetch (`${API}/equity/year/${start}/${end}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const brokers = () => {
  return fetch (`${API}/brokers`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const brokers2 = () => {
  return fetch (`${API}/brokers2`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const topbrokers = (start, end) => {
  return fetch (`${API}/brokers/TopTen/${start}/${end}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const brokersBuyTrades = (code) => {
  return fetch (`${API}/brokers/Trades/${code}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const brokersSellTrades = (code) => {
  return fetch (`${API}/brokers/Trades/sell/${code}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const brokerTradeLog = (code) => {
  return fetch (`${API}/brokers/Trades/daily/${code}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const report = () => {
  return fetch (`${API}/nasd/annualreport/`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}



export const getCorporateAction = (code) => {
  return fetch (`${API}/equity/corporate_action`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const getBonds = (code) => {
  return fetch (`${API}/equity/bonds`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const getBids = (symbol) => {
  return fetch (`${API}/security/totalBids/${symbol}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}

export const getOffers = (symbol) => {
  return fetch (`${API}/security/totalOffers/${symbol}`, {
      method: "GET"
  })
  .then(response => {
      return response.json();
  })
  .catch(err => console.log(err));
}


export const getCompaniesVolume = (symbol) => {
  return fetch(`${API}/security/companies/research/${symbol}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};



export const getUserRead = (userId, token) => {
  return fetch (`${API}/user/${userId}`, {
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
}


export const updateClientUser = ( userId, token, user) => {
  // console.log(name, email, password);
  return fetch(`${API}/user/${userId}`, {
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


export const updateUser = (user, next) => {
  if(typeof window !== 'undefined'){
    if(localStorage.getItem('jwt')){
      let auth = JSON.parse(localStorage.getItem("jwt"));
      auth.user = user
      localStorage.setItem('jwt', JSON.stringify(auth))
      next();
    }
  }
}








