document.addEventListener('DOMContentLoaded', () => {
    //const baseUrl = 'https://api.coinlore.net/api/tickers/';//
    const baseUrl = 'http://localhost:3000/data';
    const cryptoDetailsContainer = document.getElementById('cryptoDetails');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchBtn');
    const coinSelect1 = document.getElementById('coinSelect1');
    const coinSelect2 = document.getElementById('coinSelect2');
    const compareButton = document.getElementById('compareBtn');
    const comparisonResult = document.getElementById('comparisonResult');
  
    let cryptocurrencyData = [];
  
    async function fetchData() {
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            cryptocurrencyData = data;
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
   
    fetchData();

  function displayCryptocurrencyDetails(crypto) {
    cryptoDetailsContainer.innerHTML = '';
  
    if (!crypto) {
      cryptoDetailsContainer.textContent = 'Coin not found.';
      return;
    }
  
    const cryptoDetails = document.createElement('div');
    cryptoDetails.classList.add('crypto-details');
    cryptoDetails.innerHTML = `
      <h2>${crypto.name} (${crypto.symbol})</h2>
      <p>Price (USD): $${crypto.price_usd}</p>
      <p>1h Change: ${crypto.percent_change_1h}%</p>
      <p>24h Change: ${crypto.percent_change_24h}%</p>
      <p>7d Change: ${crypto.percent_change_7d}%</p>
    `;
    cryptoDetailsContainer.appendChild(cryptoDetails);
  }
  
  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim();
    if (searchQuery !== '') {
      const searchResult = cryptocurrencyData.find(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase() === searchQuery.toLowerCase()
      );
      displayCryptocurrencyDetails(searchResult);
    }
  });

  searchInput.addEventListener('input', () => {
    const searchQuery = searchInput.value.trim();
    const searchResult = cryptocurrencyData.find(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase() === searchQuery.toLowerCase()
    );

    displayCryptocurrencyDetails(searchResult);
})


function displayCoinsSymbols() {
    const coinsSymbolsContainer = document.getElementById('coinSymbols');
    coinsSymbolsContainer.innerHTML = ''; 
    for (let i = 0; i < 10 && i < cryptocurrencyData.length; i++) {
      const crypto = cryptocurrencyData[i];
      const symbolElement = document.createElement('div');
      symbolElement.classList.add('symbol-item'); 
      symbolElement.textContent = `${crypto.symbol}`; 
  
      
      symbolElement.addEventListener('click', () => {
        displayCryptocurrencyDetails(crypto); 
      });
  
      coinsSymbolsContainer.appendChild(symbolElement);
    }
  }
  
fetchData().then(() => {

    displayCoinsSymbols(); 
  });

  function displayCoinsInDropdown() {
    cryptocurrencyData.forEach(crypto => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = crypto.symbol;
        option1.textContent = `${crypto.name} (${crypto.symbol})`;
        option2.value = crypto.symbol;
        option2.textContent = `${crypto.name} (${crypto.symbol})`;
        coinSelect1.appendChild(option1);
        coinSelect2.appendChild(option2);
    });
}
fetchData().then( () => {

    displayCoinsInDropdown();  

});
compareButton.addEventListener('click', () => {
    const symbol1 = coinSelect1.value;
    const symbol2 = coinSelect2.value;
    const coin1 = cryptocurrencyData.find(item => item.symbol === symbol1);
    const coin2 = cryptocurrencyData.find(item => item.symbol === symbol2);

    if (coin1 && coin2) {
        compareCoinPrices(coin1, coin2);
    } else {
        comparisonResult.textContent = 'Please select valid coins.';
    }
});

function compareCoinPrices(coin1, coin2) {
    const coin1Price = parseFloat(coin1.price_usd);
    const coin2Price = parseFloat(coin2.price_usd);

    comparisonResult.innerHTML = '';
  
    const comparisonDetails = document.createElement('div');
    comparisonDetails.innerHTML = `
        <h4>Price Comparison</h4>
        <p>${coin1.name} (${coin1.symbol}) Price: $${coin1Price.toFixed(2)}</p>
        <p>${coin2.name} (${coin2.symbol}) Price: $${coin2Price.toFixed(2)}</p>
        <p>Difference: $${Math.abs(coin1Price - coin2Price).toFixed(2)}</p>
    `;
    comparisonResult.appendChild(comparisonDetails);
}
  

    
  });
  