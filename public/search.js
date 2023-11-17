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

// function displaySearchResults(results) {
//     const searchResults = document.getElementById('searchResults');
//     searchResults.innerHTML = '';

//     results.forEach(result => {
//         const resultElement = document.createElement('div');
//         resultElement.classList.add('result-box'); // Add the 'result-box' class

//         resultElement.innerHTML = `<h3>${result._source.Name}</h3><p>${result._source.Description}</p>`;
        
//         // Check if the Website property exists before appending it to the resultElement
//         if (result._source.Website) {
//             resultElement.innerHTML += `<a href="${result._source.Website}" target="_blank">Visit Website</a>`;
//         }

//         searchResults.appendChild(resultElement);
//     });
// }

// Check if the search input is empty when the page loads
window.addEventListener('load', function() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() === '') {
        searchElasticsearch(searchTerm);
    }
});


// Function to display search results or a "No Results Found" card
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (results.length === 0) {
        const noResultsCard = document.createElement('div');
        noResultsCard.classList.add('result-box');

        noResultsCard.innerHTML = `<p>No Results Found</p>`;
        searchResults.appendChild(noResultsCard);
    } else {
        results.forEach(result => {
            const resultElement = document.createElement('div');
            resultElement.classList.add('result-box');

            resultElement.innerHTML = `<h3>${result._source.Name}</h3><p>${result._source.Description}</p>`;

            if (result._source.Website) {
                resultElement.innerHTML += `<a href="${result._source.Website}" target="_blank">Visit Website</a>`;
            }

            searchResults.appendChild(resultElement);
        });
    }
}