document.addEventListener("DOMContentLoaded", () => {
    const baseURL = "https://api.coinlore.net/api/tickers/";
    //const baseUrl = 'http://localhost:3000/data';
    const cryptoDetailsContainer = document.getElementById("cryptoDetails");
    const SearchInputContent = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchBtn");
    const coinSelect1 = document.getElementById("coinSelect1");
    const coinSelect2 = document.getElementById("coinSelect2");
    const compareButton = document.getElementById("compareBtn");
    const compareResults = document.getElementById("comparisonResult");

    let cryptoCurrencyData = [];


    function fetchData() {
        fetch(baseURL)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                cryptoCurrencyData = data.data || [];
                
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });        
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
          const searchResult = cryptoCurrencyData.find(crypto =>
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase() === searchQuery.toLowerCase()
          );
          displayCryptocurrencyDetails(searchResult);
        }
      });
      

})