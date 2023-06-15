import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.css']
})
export class MarketComponent implements AfterViewInit{
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "symbols": [
          [
            "BITSTAMP:BTCUSD|1D"
          ],
          [
            "BITSTAMP:ETHUSD|1D"
          ],
          [
            "COINBASE:LINKUSD|1D"
          ],
          [
            "BITSTAMP:XRPUSD|1D"
          ],
          [
            "GEMINI:ATOMUSD|1D"
          ]
        ],
        "chartOnly": false,
        "width": 1440,
        "height": 700,
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": true,
        "hideMarketStatus": true,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "Graphie",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "line",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }`;
    this.containerRef.nativeElement.appendChild(script);
  }
}
