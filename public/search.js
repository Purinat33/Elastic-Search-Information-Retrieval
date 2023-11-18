document.getElementById('searchForm').addEventListener('submit', function (event) {
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

    const wildcardQuery = {
        query: {
            bool: {
                should: [
                    {
                        wildcard: {
                            Name: `${queryToUse}*`
                        }
                    },
                    {
                        wildcard: {
                            Description: `${queryToUse}*`
                        }
                    },
                    {
                        wildcard: {
                            Website: `${queryToUse}*`
                        }
                    }
                ]
            }
        }
    };

    const matchQuery = {
        query: {
            bool: {
                should: [
                    {
                        match_phrase: {
                            Name: queryToUse
                        }
                    },
                    {
                        match_phrase: {
                            Description: queryToUse
                        }
                    },
                    {
                        match_phrase: {
                            Website: queryToUse
                        }
                    }
                ]
            }
        }
    };

    const url = `http://localhost:9200/university/_search`;
    const requestBody = singlePartialMode ? wildcardQuery : matchQuery;

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