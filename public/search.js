document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    searchElasticsearch(searchTerm);
});

function searchElasticsearch(query) {
    const queryToUse = query.trim(); // Remove leading/trailing whitespaces

    if (queryToUse === '') {
        displaySearchResults([]); // Display no results if query is empty
        return; // Exit function early if query is empty
    }

    // Split the query by spaces to handle logical operators
    const terms = queryToUse.split(/\s+/);
    const shouldClauses = [];

    terms.forEach(term => {
        if (term.toUpperCase() === 'AND' || term.toUpperCase() === 'OR') {
            // For 'AND' and 'OR' operators, add them to the shouldClauses array
            shouldClauses.push(term.toUpperCase());
        } else {
            // For other terms, construct wildcard queries as before
            const wildcardQuery = {
                wildcard: {
                    Name: `${term}*`
                }
            };

            shouldClauses.push(wildcardQuery);
        }
    });

    const requestBody = {
        query: {
            bool: {
                should: shouldClauses
            }
        }
    };
    
    const url = `http://localhost:9200/university/_search`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => {
        displaySearchResults(data.hits.hits);
    })
    .catch(error => {
        console.error('Error fetching data from Elasticsearch:', error);
    });
}

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

// Check if the search input is empty when the page loads
window.addEventListener('load', function() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() === '') {
        searchElasticsearch(searchTerm);
    }
});
