import React, {useState, useEffect} from 'react';
import {ticker} from './Apicore';




const Ticker = () => {
    const [rates, setRates] = useState([]);
  
    const init = () => {
        ticker().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setRates(data)
            }
        })
       
    }

    useEffect(() => {
       init(); 
    }, []);
    // A placeholder is needed, to tell react-ticker, that width and height might have changed
    // It uses MutationObserver internally


    const priceTicker = () => {
        return (
<div style={{background:"#000000", borderBottom:"1px solid white", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}>
<marquee>
{rates.map((s,i) => {
    if (s.percent === 0 ) {
        var txt="text-warning mr-1 mrl-1";
        var arrow = "—";
    
    }else if (s.percent > 0) {
         txt="text-success mr-1 mrl-1";
         arrow = "▲";
    } else if (s.percent <  0) {
         txt="text-danger mr-1 mrl-1";
         arrow = "▼ ";
    } 
return  (
    
        <span className="text-white mr-4" key={i} style={{fontSize: "1.1rem"}}> <span className="font-weight-bolder">{s.Security} </span> <span className={txt}>{s.close.toFixed(2)}</span> <span className={txt}> {arrow} </span> <span className={txt}>{s.percent.toFixed(2)}%</span> </span>
    
)
})}
</marquee>
</div>  
        )
    }

  
    
   



    return (
        <div>
         {priceTicker()}
         
         </div>  
      
    )

};
  
   
  export default Ticker;

