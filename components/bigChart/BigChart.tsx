import { useState, useEffect, useRef } from "react";

interface ChartWidget {
  widget?: any;
}

export default function BigChart() {
  const onLoadScriptRef = useRef<(() => void) | null>(null);
  const [chart, setChart] = useState<Promise<ChartWidget> | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!chart) {
      setChart(
        new Promise<ChartWidget>((resolve) => {
          const script: HTMLScriptElement = document.createElement("script");
          script.id = "tradingview-widget-loading-script";
          script.src = "https://s3.tradingview.com/tv.js";
          script.type = "text/javascript";
          script.onload = (event: Event) => resolve(event.target as ChartWidget);
          document.head.appendChild(script);
        })
      );
    }

    chart?.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (document.getElementById("tradingview") && 'TradingView' in window) {
        const TradingView: any = window.TradingView;
        new TradingView.widget({
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
  }, [chart]);

  return <div id="tradingview" style={{ width: "100%", height: "100%" }} />;
}
