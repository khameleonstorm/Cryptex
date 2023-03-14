import s from './CryptoChart.module.css';
import { useEffect } from 'react';

export default function CryptoChart() {

  useEffect(() => {
    const script = document.createElement('script')
    const chartDiv = document.getElementById('cryptochart')
    
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-screener.js"
    script.type = 'text/javascript'
    script.async = true
    
    const loadscript =   {
      "width": "100%",
      "height": "100%",
      "defaultColumn": "overview",
      "screener_type": "crypto_mkt",
      "displayCurrency": "USD",
      "colorTheme": "dark",
      "locale": "en",
      "isTransparent": true
    }
    
    script.innerHTML = JSON.stringify(loadscript)
    chartDiv?.appendChild(script)
  }, [])



  return (
    <div className={s.container}>
      <div className={`${s.tvcontainer} tradingview-widget-container__widget`} id="cryptochart">
      </div>
    </div>
  )
}




