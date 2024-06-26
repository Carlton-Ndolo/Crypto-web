//DOMContentLoaded Event Listener//
document.addEventListener('DOMContentLoaded', () => {
  
// creation of variables to fetch html data//

    //const baseUrl = 'https://api.coinlore.net/api/tickers/';//
    const baseUrl = 'http://localhost:3000/data'; // After watching db.json, we alternated to use this as our endpoint//
    const cryptoDetailsContainer = document.getElementById('cryptoDetails');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchBtn');
    const coinSelect1 = document.getElementById('coinSelect1');
    const coinSelect2 = document.getElementById('coinSelect2');
    const compareButton = document.getElementById('compareBtn');
    const comparisonResult = document.getElementById('comparisonResult');
  
    let cryptocurrencyData = [];
  
    async function fetchData() {  // I used an asynchronous function to allow me to fetch data//
        try {
            const response = await fetch(baseUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok'); // in this block of code, I use a try-catch statement in the code to handle potential errors such as network interuptions//
            }
            const data = await response.json();
            cryptocurrencyData = data;
            
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
   
    fetchData(); 
//Display Cryptocurrency Details//
  function displayCryptocurrencyDetails(crypto) {
    cryptoDetailsContainer.innerHTML = '';  //I return it in this form to clear any prior HTML content that maybe present
  
    if (!crypto) {
      cryptoDetailsContainer.textContent = 'Coin not found.'; 
      return;
    }
  
    const cryptoDetails = document.createElement('div'); // I create a new div element //
    cryptoDetails.classList.add('crypto-details'); // I add a new css class to it that we'll see later that I will use it in styling
    cryptoDetails.innerHTML = `
      <h2>${crypto.name} (${crypto.symbol})</h2>
      <p>Price (USD): $${crypto.price_usd}</p>
      <p>1h Change: ${crypto.percent_change_1h}%</p>
      <p>24h Change: ${crypto.percent_change_24h}%</p>
      <p>7d Change: ${crypto.percent_change_7d}%</p>
    `;
    cryptoDetailsContainer.appendChild(cryptoDetails); // I append this div element to the parent element
  }
  
  //'click' EventListener//
  searchButton.addEventListener('click', () => {
    const searchQuery = searchInput.value.trim(); // I retrieve the value of the searchInput element and trim any extra spaces when typed in the input//
    if (searchQuery !== '') {
      const searchResult = cryptocurrencyData.find(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || // in this block of code, I try to find a crypto that matches the search query//
        crypto.symbol.toLowerCase() === searchQuery.toLowerCase() ||
        crypto.symbol.toUpperCase () === searchQuery.toUpperCase()
      );
      displayCryptocurrencyDetails(searchResult);
    }
  });

  //'input' EventListener//
  searchInput.addEventListener('input', () => {   
    const searchQuery = searchInput.value.trim();  // I retrieve the value of the searchInput element and trim any extra spaces when typed in the input//
    const searchResult = cryptocurrencyData.find(crypto =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) || // in this block of code, I try to find a crypto that matches the search query//
        crypto.symbol.toLowerCase() === searchQuery.toLowerCase() ||
        crypto.symbol.toUpperCase() === searchQuery.toUpperCase()
    );

    displayCryptocurrencyDetails(searchResult); // I pass the searchResult variable as an arguement, which will assist in displaying details we ran above//
})

//I created a function to display Coin symbols
function displayCoinsSymbols() {
    const coinsSymbolsContainer = document.getElementById('coinSymbols');
    coinsSymbolsContainer.innerHTML = ''; 
    for (let i = 0; i < 10 && i < cryptocurrencyData.length; i++) {  // I only want to display the first 10 symbols of the first 10 coins so I loop through the items//
      const crypto = cryptocurrencyData[i];
      const symbolElement = document.createElement('div');
      symbolElement.classList.add('symbol-item');   // I add a css class that will later prove helpful in styling//
      symbolElement.textContent = `${crypto.symbol}`; 
  
      //'click' EventListener//
      symbolElement.addEventListener('click', () => {
        displayCryptocurrencyDetails(crypto); 
      });
  
      coinsSymbolsContainer.appendChild(symbolElement);
    }
  }
  
fetchData().then(() => {

    displayCoinsSymbols(); // We are calling the function, hence This will display the first 10 symbols//
  });

  
  function displayCoinsInDropdown() {
    cryptocurrencyData.forEach(crypto => {  // iterate through each cryptocurrency in the cryptocurrencyData array//
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = crypto.symbol;
        option1.textContent = `${crypto.name} (${crypto.symbol})`; // in this block of code, I set values for two options, which I later append//
        option2.value = crypto.symbol;
        option2.textContent = `${crypto.name} (${crypto.symbol})`;
        coinSelect1.appendChild(option1);
        coinSelect2.appendChild(option2);
    });
}
fetchData().then( () => {

    displayCoinsInDropdown();  

});

// 'click' EventListener//
compareButton.addEventListener('click', () => {
    const symbol1 = coinSelect1.value;
    const symbol2 = coinSelect2.value;
    const coin1 = cryptocurrencyData.find(item => item.symbol === symbol1); // In this code block, I Find the corresponding coins in the cryptocurrencyData array based on their symbols//
    const coin2 = cryptocurrencyData.find(item => item.symbol === symbol2);

    if (coin1 && coin2) {  // The if conditional will check if both coins exist and will call the compareCoinPrices if found valid//
        compareCoinPrices(coin1, coin2);
    } else {
        comparisonResult.textContent = 'Please select valid coins.';
    }
});

// Calculation to compare coin prices//
function compareCoinPrices(coin1, coin2) {
    const coin1Price = parseFloat(coin1.price_usd);
    const coin2Price = parseFloat(coin2.price_usd); // Extract the price values as floats from the coin objects//

    comparisonResult.innerHTML = '';
  
    const comparisonDetails = document.createElement('div');

    // In the below block of code, I set the HTML content of the comparisonDetails element//
    comparisonDetails.innerHTML = `     
        <h4>Price Comparison</h4>
        <p>${coin1.name} (${coin1.symbol}) Price: $${coin1Price.toFixed(2)}</p>   
        <p>${coin2.name} (${coin2.symbol}) Price: $${coin2Price.toFixed(2)}</p>
        <p>Difference: $${Math.abs(coin1Price - coin2Price).toFixed(2)}</p>
    `;
    comparisonResult.appendChild(comparisonDetails);
}
  

    
  });
  