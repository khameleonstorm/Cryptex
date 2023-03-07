import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import styles from './Trading.module.css';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(
    () => {
      onLoadScriptRef.current = createWidget;

      if (!tvScriptLoadingPromise) {
        tvScriptLoadingPromise = new Promise((resolve) => {
          const script = document.createElement('script');
          script.id = 'tradingview-widget-loading-script';
          script.src = 'https://s3.tradingview.com/tv.js';
          script.type = 'text/javascript';
          script.onload = resolve;

          document.head.appendChild(script);
        });
      }

      tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

      return () => onLoadScriptRef.current = null;

      function createWidget() {
        if (document.getElementById('tradingview') && 'TradingView' in window) {
          new window.TradingView.widget({
            autosize: true,
            symbol: "FX_IDC:NGNUSD",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            enable_publishing: false,
            withdateranges: false,
            hide_side_toolbar: true,
            allow_symbol_change: true,
            studies: ["STD;Bull%Bear%Power"],
            container_id: "tradingview",
          });
        }
      }
    },[]);

  return (
    <div className={styles.container}>
      <div id='tradingview' className={styles.chart}/>
      {
        <div className={styles.trade1}>
          <p>Asset <br/> <span>USDT</span></p>
          <div className={styles.BS}>
            <p>Buy Rate<br/><span>$1.000</span></p>
            <p>Sell Rate<br/><span>$1.015</span></p>
          </div>
  
          <p>Number Of Trades Per Day<br/><span>3 Trades</span></p>
  
          <div className={styles.note}>
            <p>Trades completes after 24 hours and automatically renews itself until it's closed.</p>
          </div>
  
          <div className={styles.btns}>
            <button className='bigBtn full'>Open Trade</button>
            <button className='bigBtn full'>Close Trade</button>
          </div>
        </div>
      }

      {/* {
        <div className={styles.trade2}>
          <h2>Trade</h2>
          <TextField label="Amount" InputLabelProps={{ shrink: true }} InputProps={{inputMode: 'numeric'}}/>
          <button className='bigBtn full'>Start Trade</button>
        </div>
      } */}
    </div>
  );
}
