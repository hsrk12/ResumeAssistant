$(document).ready(function() {
    $("#submitRole").on("click", function(event){
        event.preventDefault(); // Prevents default form submission behavior

        $.ajax({
            type: 'POST',
            url: '/generate-points', // This should match your server route
            success: function(response) {
                // Update the DOM with the received data
                const results = $('#results');
                results.empty(); // Clear existing data

                console.log(response);
                console.log(response.bulletPoints);
                // Split the response at each newline and create a paragraph for each line
                if (response) {
                    const points = response.split('\n');
                    points.forEach(function(point) {
                        if (point.trim().length > 0) {
                            const paragraph = $('<p></p>').text(point); // Creating a new paragraph for each point
                            results.append(paragraph);
                        }
                    });
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
});
