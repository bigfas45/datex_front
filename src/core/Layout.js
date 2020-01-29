import React, {useState, useEffect} from 'react';
import { MarketIndexT, MarketIndexY, LiveTrade, ParticipantsLogin} from './Apicore';




const GetRatesFromAPI = () => {
  
    const [indexT, setIndexT] = useState([]);
    const [indexY, setIndexY] = useState([]);
    const [trade, setTrade] = useState([]);
    const [pLogin, setPlogin] = useState([]);




    const initIndexT = () => {
        MarketIndexT().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setIndexT(data)
            }
        })
       
    }


    const initIndexY = () => {
        MarketIndexY().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setIndexY(data)
            }
        })
       
    }


    const initLiveTrade = () => {
        LiveTrade().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setTrade(data)
            }
        })
       
    }


    const initPlogin = () => {
        ParticipantsLogin().then(data => {
            if (data.error) {
                console.log(data.error)
            }else{
                setPlogin(data)
            }
        })
       
    }


    


    useEffect(() => {
       
       initIndexT();
       initIndexY();
       initLiveTrade();
       initPlogin();
      
    
    }, []);
    // A placeholder is needed, to tell react-ticker, that width and height might have changed
    // It uses MutationObserver internally


  

    const marketNumbersOne = () => {
        return (
            <div style={{borderBottom:"1px solid white"}}> 
                
           
            <div className="row" style={{background:"#000000", color:"white", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}>
            <div className="col" style={{marginTop:"5px", textAlign: "right"}}> 
               <table>
                   <thead></thead>
                   <tbody>
                   <tr>
               {indexT.map((iT, i) => {
           return(
               <div>
                <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> USI :</h5></td>

               <td key={i} style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{iT.usi}  </h5></td>
          {indexY.map((Iy, i) => {
               const todayrow = iT.usi
               const yesterdayrow = Iy.usi
               const usiPercentageChange = (((todayrow - yesterdayrow) /  yesterdayrow) * 100 ).toFixed(2)
               let usiTextChange;
               if (usiPercentageChange > 0) {
                    usiTextChange = <span style={{color:"#07fe00"}}>&#9650;  {usiPercentageChange} % </span>
               }else if(usiPercentageChange <  0){
                    usiTextChange = <span style={{color:"red"}}>&#9660;  {usiPercentageChange} % </span>
               }else{
                   usiTextChange =    <span className="text-warning">&#8212;  {usiPercentageChange} % </span>
               }
              return (
               
               <td><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{usiTextChange}</h5></td>
              )
          })}
               </div>
               )
           })}
                   </tr>
                   </tbody>
           </table>
            </div>
            
            <div className="col" style={{marginTop:"5px", textAlign: "right", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}> 
               <table>
               <tbody>
                   <tr>
                       {trade.map((lTrade, i) => {
                           let Pvolume =  lTrade.volume;
                           if (Pvolume === null ) {
                               Pvolume = 0
                           }
                           return (
                               <div key={i}>
                                <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> Volume Traded :</h5></td>
                                   <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> {Pvolume.toLocaleString()} </h5></td> 
                                   {indexY.map((pV, i) => {
                                   var previousVolume = pV.volume
                                   if (previousVolume === 0) {
                                       previousVolume = 1
                                   }
                                   const liveTradeVolume = lTrade.volume
                                   const volumePercentageChange = (((liveTradeVolume - previousVolume) /  previousVolume) * 100 ).toFixed(2)
                                   let volumeTextChange;
                                   if (volumePercentageChange > 0) {
                                       volumeTextChange = <span style={{color:"#07fe00"}}>&#9650;  {volumePercentageChange} % </span>
                                   }else if(volumePercentageChange < 0){
                                       volumeTextChange = <span style={{color:"#fa3e3e"}}>&#9660;  {volumePercentageChange} % </span>
                                   }else{
                                       volumeTextChange =    <span className="text-warning">&#8212;  {volumePercentageChange} % </span>
                                   }
                               return (
                                                       <td><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> {volumeTextChange} </h5></td>
                                           )
                               })}
                               </div>
                              
                           )
                       })}
                     


                   </tr>
                   </tbody>
               </table>
            </div>
          
            <div className="col" style={{marginTop:"5px", textAlign: "right", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}> 
               <table>
               <tbody>
                   <tr>
                       {trade.map((lTrade, i) => {
                           return (
                               <div>
                        <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> Deals Executed :</h5></td>
                       <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> {lTrade.tTrade} </h5></td> 
                       {indexY.map((Iy, i) => {
               const liveDealRow = lTrade.tTrade
               let previousDealRow = Iy.deals
               if (previousDealRow === 0) {
                   previousDealRow=1
               }
               const dealPercentageChange = (((liveDealRow - previousDealRow) /  previousDealRow) * 100 ).toFixed(2)
               let dealTextChange;
               if (dealPercentageChange > 0) {
                    dealTextChange = <span style={{color:"#07fe00"}}>&#9650;  {dealPercentageChange } % </span>
               }else if(dealPercentageChange < 0){
                    dealTextChange = <span style={{color:"red"}}>&#9660;  {dealPercentageChange} % </span>
               }else{
                   dealTextChange =    <span className="text-warning">&#8212;  {dealPercentageChange} % </span>
               }
              return (
                       <td><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> {dealTextChange} </h5></td>
                       )
                   })}
                       </div>
                              
                           )
                       })}


                   </tr>
                   </tbody>
               </table>
            </div>
            </div>
            </div>
        )
    }

    const marketNumbersTwo = () => {
        return (
            <div style={{borderBottom:"1px solid white"}}> 
            <div className="row" style={{background:"#000000", color:"white", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}>

            <div className="col" style={{marginTop:"5px", textAlign: "right"}}> 
               <table>
               <tbody>
                   <tr>
                   {indexT.map((Mcap, i) => {
                       return(
                           <div>
                       <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> Mkt. Cap (₦'Bn) :</h5></td>
                       <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{(Mcap.capitalisation/ 1000000000).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h5></td> 
                   {indexY.map((McapY, i) => {
                       const McapRowT = Mcap.capitalisation
                       const McapRowY = McapY.capitalisation
                       const McapPercentageChange = (((McapRowT - McapRowY) /  McapRowY) * 100 ).toFixed(2)
               let McapTextChange;
               if (McapPercentageChange > 0) {
                    McapTextChange = <span style={{color:"#07fe00"}}>&#9650;  {McapPercentageChange} % </span>
               }else if(McapPercentageChange < 0){
                    McapTextChange = <span style={{color:"red"}}>&#9660;  {McapPercentageChange} % </span>
               }else{
                   McapTextChange =    <span className="text-warning">&#8212;  {McapPercentageChange} % </span>
               }
                       return(
                           <td><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{McapTextChange} </h5></td>
                       )
                   })}
                       </div>
                         )
                       })}


                   </tr>
                   </tbody>
               </table>
            </div>

            <div className="col" style={{marginTop:"5px", textAlign: "right" , fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}> 
               <table>
               <tbody>
                   <tr>
                       {trade.map((lTrade, i) => {
                           
                           let Pvalue = lTrade.value

                           if (Pvalue === null) {
                               Pvalue =0
                           }

                           return (
                               <div>
                        <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> Value Traded (₦'000)  :</h5></td>
                       <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right"}}>{Pvalue.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h5></td> 
                       {indexY.map((Iy, i) => {
               const liveValue = lTrade.value
               let previousValueRow = Iy.value
               if (previousValueRow === 0) {
                   previousValueRow=1
               }
               const valuePercentageChange = (((liveValue - previousValueRow) /  previousValueRow) * 100 ).toFixed(2)
               let valueTextChange;
               if (valuePercentageChange > 0) {
                    valueTextChange = <span style={{color:"#07fe00"}}>&#9650;  {valuePercentageChange} % </span>
               }else if(valuePercentageChange < 0){
                    valueTextChange = <span style={{color:"red"}}>&#9660;  {valuePercentageChange} % </span>
               }else{
                   valueTextChange =    <span className="text-warning">&#8212;  {valuePercentageChange} % </span>
               }
              return (
                 
              <td><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{valueTextChange}</h5></td>
                       )
                   })}
                       </div>
                              )
                          })}

                   </tr>
                   </tbody>
               </table>
            </div>

            <div className="col" style={{marginTop:"5px", textAlign: "right", fontFamily:"Geostar Unica One Arial Helvetica sans-serif"}}> 
               <table>
               <tbody>
                   <tr>
                      {pLogin.map((login , i) => {
                          return(
                              <div>
                                <td style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}> Participants logged in :</h5></td>
                                <td key={i} style={{color:"white", textAlign: "right"}}><h5 style={{color:"white", textAlign: "right", fontSize: "1.1rem"}}>{login.tCount}</h5></td> 
                              </div>

                          )
                      })}
                   </tr>
                   </tbody>
               </table>
            </div>
        </div>
        </div>
        )
    }


   



    return (
        <div>
         {marketNumbersOne()}
         {marketNumbersTwo()}
         </div>  
      
    )

};
  
   
  export default GetRatesFromAPI;

