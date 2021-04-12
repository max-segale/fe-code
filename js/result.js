$(document).ready(function () {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  if (window.localStorage) {
    if (localStorage.userObject) {
      var user_object = localStorage.getItem('userObject');

      // Parse the retrieved object into an JSON object
      retreivedObject = JSON.parse(user_object);

      if (JSON.stringify(retreivedObject) == '[]') {
        // Show no results
        $('#result-count').text(
          '0 Results'
        );
        $('#result-subtext').text(
          'Try starting a new search below'
        );
      } else {
        // Populate person data
        $('#result-count').text(
          '1 Result'
        );
        $('#result-subtext').html(
          'Look at the result below to see the details of the person you&rsquo;re searched for.'
        );
        $('#user-name').append(
          retreivedObject.first_name + ' ' + retreivedObject.last_name
        );
        $('#user-description').append(
          retreivedObject.description
        );
        $('#user-address').append(
          retreivedObject.address
        );
        $('#user-email').append(
          retreivedObject.email
        );

        // Possibly multiple phone numbers
        for (const phone_number in retreivedObject.phone_numbers) {
          phone = retreivedObject.phone_numbers[phone_number];

          // Display in traditional phone number format
          formatted_phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`;

          $('#user-phone-num').append(
            `<a class="result-phone-link" href="tel:${phone}">${formatted_phone}</a>`
          );
        }

        // Possibly multiple relatives
        for (const relative in retreivedObject.relatives) {
          $('#user-relatives').append(
            `<p class="mb-0">${retreivedObject.relatives[relative]}</p>`
          );
        }

        // Show result after all the data has been added
        $('.result-wrap').show();
      }
    }
  }
});
