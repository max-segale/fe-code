$(document).ready(function () {

  /**
   * Makes a request to ltv API to search an specific email address or phoen number.
   * If there's a response, it gets stored in the local storage and redirects to results page
   */
  function sendSearch(searchVal, searchType) {
    const proxyurl = '';
    const url = 'https://ltv-data-api.herokuapp.com/api/v1/records.json?' + searchType + '=' + searchVal;

    // Clear storage before request
    localStorage.clear();

    fetch(proxyurl + url)
      .then((response) => response.text())
      .then(function (contents) {
        // Set new storage item
        localStorage.setItem('userObject', contents);

        // Redirect to Result page, display local storage data
        window.location.href = 'result.html';
      })
      .catch((e) => console.log(e));
  }

  /*
   * Validate input value based on search type
   */
  function validateInput(searchVal, searchType) {
    let isValid = false;
    let matchPattern = null;

    // Use different RexExp for each type
    if (searchType === 'email') {
      matchPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    } else if (searchType === 'phone') {
      matchPattern = /^\d{10}$/;
    }

    // Check for RegExp pattern match
    if (searchVal.match(matchPattern)) {
      isValid = true;
    }

    return isValid;
  }

  /*
   * Adds the loading section to the page
   * Hides the other sections on the page
   */
  function viewLoadingMsg() {
    // Create loading section with waiting message
    const loadingSection = $('<section class="loading"></section>');
    loadingSection.append('<div class="loading-icon"><img src="img/loading_spinner.gif" alt="Loading"></div>');
    loadingSection.append('<h2 class="loading-msg">Please wait a moment...</h2>');

    // Hide the current sections on the page
    $('section').hide();

    // Add the new loading section to the page
    $('.navbar').after(loadingSection);
  }

  /*
   * Submit new search
   * Validate input, send new request
   */
  function submitSearch(submitEvent, searchType) {
    // Stop the page from refreshing
    submitEvent.preventDefault();

    // Get input value
    const searchInput = $(submitEvent.target.elements[searchType]);
    const searchVal = searchInput.val().toLowerCase();

    // Validate input
    const isValid = validateInput(searchVal, searchType);
    
    if (isValid) {
      // Hide validation requirement message
      searchInput.parent().removeClass('error');

      // Show the waiting message for the request
      viewLoadingMsg();

      // Send search request
      sendSearch(searchVal, searchType);

    } else {
      // Show validation requirement message
      searchInput.parent().addClass('error');
    }
  }

  /*
   * Email form submit event
   */
  $('#email-search').on('submit', (e) => {
    submitSearch(e, 'email');
  });

  /*
   * Phone number submit event
   */
  $('#phone-search').on('submit', (e) => {
    submitSearch(e, 'phone');
  });

});
