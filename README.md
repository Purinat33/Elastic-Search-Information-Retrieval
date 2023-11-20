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