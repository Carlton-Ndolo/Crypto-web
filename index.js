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
                cryptocurrencyData = data.data || [];
                displayCoinsInDropdown(); // Call the function to display coins in dropdown
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }

})