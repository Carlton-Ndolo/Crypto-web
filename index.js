document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'https://api.coinlore.net/api/tickers/';
    //const baseUrl = 'http://localhost:3000/data';
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
            cryptocurrencyData = data.data || [];
            
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
  
  
  

    
  });
  