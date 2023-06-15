import { Component } from '@angular/core';
import axios from 'axios';
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchTerm: string;
  searched : string = ""
  search() {
    console.log(this.searched)
      const searchUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${this.searched}&order=market_cap_desc&per_page=1&page=1&sparkline=false`;
      axios.get(searchUrl)
        .then(response => {
          const coinData = response.data[0];
          if (coinData) {
            window.location.href = `https://www.coingecko.com/en/coins/${coinData.id}`;
          }
        })
        .catch(error => {
          console.error('Error occurred during search:', error);
        });

  }
}
