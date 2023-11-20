# University Search System using Elastic Search and HTML

### HTML Structure
- The HTML contains a form with an input field for search, buttons for logical operators, and a checkbox for partial query.
- It also has a main section where search results are displayed.

### JavaScript Logic
1. **`preventUnintendedRedirect()`**: This function runs on DOM load and redirects the page to a specified URL if the current URL is different.

2. **`handleInput(event)`**: Fired when there's an input in the main search input field. It captures the query, checks the partial query checkbox, and calls `searchElasticsearch(query)` if the checkbox is unchecked.

3. **`addLogicalOperator(operator)`**: Appends the logical operator ('AND' or 'OR') to the search input field at the current cursor position.

4. **`searchElasticsearch(query)`**: Processes the search query.
    - Trims the query and splits it by spaces to handle logical operators.
    - Constructs Elasticsearch queries based on the input query.
    - Sends a request to Elasticsearch and displays the results or a "No Results Found" message if the query is empty.

5. **`displaySearchResults(results)`**: Renders search results on the page based on the data retrieved from Elasticsearch.

6. **`handlePartialQueryCheck()`**: Triggered by the partial query checkbox change.
    - Disables the main search input and logical operator buttons when checked.
    - Dynamically creates a new input for partial query if checked and enables input functionality.
    - Enables/disables the inputs and logical operator buttons when the checkbox is checked/unchecked.

7. **`handlePartialInput(partialQuery)`**: Processes partial search queries.
    - Constructs a wildcard query for multiple fields (`Name`, `Description`, `Website`) based on the partial query.
    - Sends a request to Elasticsearch and displays the results for partial queries.

8. **Event Listeners**:
    - Add event listeners for the partial query checkbox change and the partial search input change to trigger respective functions.
    - Remove the submit event listener for the partial search form (which is commented out).

This program integrates UI interaction with Elasticsearch queries and dynamically adjusts functionality based on the user's interaction with the search components.

<hr>

## How to use Elastic Search for Query

Constructing a query for Elasticsearch involves forming a JSON object that adheres to the Elasticsearch Query DSL (Domain Specific Language). The structure of the query depends on the type of search you want to perform, whether it's a full-text search, term-based search, or a more complex query involving logical operations.

Here's an example of constructing a simple query using the Elasticsearch Query DSL:

### Example Query Structure:

Let's say we want to perform a full-text search for universities where the `Name`, `Description`, or `Website` matches a given term.

```javascript
const requestBody = {
    query: {
        bool: {
            should: [
                {
                    multi_match: {
                        query: "your_search_term",
                        fields: ["Name", "Description", "Website"]
                    }
                }
            ]
        }
    }
};
```

- `query`: Specifies the type of query being performed. Here, it's a `bool` query which allows combining multiple queries.
- `bool`: Defines a boolean query that can contain multiple subqueries.
- `should`: Within a `bool` query, `should` is used for conditions that should be met. This acts like an OR operator, where at least one condition should match.

### Form of Data Returned from Elasticsearch:

When you send a query to Elasticsearch, it processes the data based on your query parameters and returns a JSON response. This response usually contains information based on your query structure and the matching documents found in the Elasticsearch index.

Here's a general structure of the response:

```json
{
    "took": 5,
    "timed_out": false,
    "_shards": {
        "total": 5,
        "successful": 5,
        "skipped": 0,
        "failed": 0
    },
    "hits": {
        "total": {
            "value": 10,
            "relation": "eq"
        },
        "hits": [
            {
                "_index": "your_index",
                "_type": "_doc",
                "_id": "1",
                "_score": 4.0,
                "_source": {
                    "Name": "University Name",
                    "Description": "Description of the university",
                    "Website": "https://universitywebsite.com"
                }
            },
            // More matching documents...
        ]
    }
}
```

- `took`: Time taken by Elasticsearch to execute the query.
- `hits`: Contains the matched documents along with their scores (`_score`) and source data (`_source`). Each hit represents a document from the index that matched the query.

Constructing a query involves understanding the Elasticsearch Query DSL and tailoring it to suit your specific search requirements. The response will contain matching documents along with relevant metadata, allowing you to process and display the results accordingly in your application.