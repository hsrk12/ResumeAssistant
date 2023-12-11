submitRole.addEventListener("click", function(){
    $.ajax({
        type: 'POST',
        url: '/generate-points', // This should match your server route
        success: function(response) {
          // Update the DOM with the received data
          const results = $('#results');
          results.empty(); // Clear existing data
            //console.log(response.bulletPoints);
          const textNode = document.createTextNode(JSON.stringify(response.bulletPoints));
          results.append(textNode);
        },
        error: function(error) {
          console.error('Error:', error);
        }
      });
});