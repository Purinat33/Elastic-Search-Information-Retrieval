document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    searchElasticsearch(searchTerm);
});

function searchElasticsearch(query) {
    const url = `http://localhost:9200/university/_search?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.hits.hits);
        })
        .catch(error => {
            console.error('Error fetching data from Elasticsearch:', error);
        });
}

// function displaySearchResults(results) {
//     const searchResults = document.getElementById('searchResults');
//     searchResults.innerHTML = '';

//     results.forEach(result => {
//         const resultElement = document.createElement('div');
//         resultElement.innerHTML = `<h3>${result._source.Name}</h3><p>${result._source.Description}</p>`;
        
//         // Check if the Website property exists before appending it to the resultElement
//         if (result._source.Website) {
//             resultElement.innerHTML += `<a href="${result._source.Website}" target="_blank">Visit Website</a>`;
//         }

//         searchResults.appendChild(resultElement);
//     });
// }

function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.classList.add('result-box'); // Add the 'result-box' class

        resultElement.innerHTML = `<h3>${result._source.Name}</h3><p>${result._source.Description}</p>`;
        
        // Check if the Website property exists before appending it to the resultElement
        if (result._source.Website) {
            resultElement.innerHTML += `<a href="${result._source.Website}" target="_blank">Visit Website</a>`;
        }

        searchResults.appendChild(resultElement);
    });
}
