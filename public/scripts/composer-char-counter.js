$(document).ready(function() {
  // Load tweets from DB
  loadtweets();
  // Display the number of characters typed in
  $("#tweet-text").on("input", function (){
    const count = 140 - this.value.length;
    $(".counter").each (function () {
      $(this).val(count);
      if (count < 0) {
        $(this).addClass("counter-red");
        $(this).removeClass("counter-black");
      } else {
        $(this).addClass("counter-black");
        $(this).removeClass("counter-red");
      }
    });
    // Hide validation while typing data in the field
    $("#error").hide();
  });

  // Process on data submission if user clicks TWEET button
  $("form").submit(function(event) {
    event.preventDefault();
    // Validate the length of tweet content must be > 0 and <= 140 
    const tweetLength = $('#tweet-text').val().length;
    if (tweetLength === 0) {
      $('#error').text('Sorry, your tweet cannot be blank!').show();
    } else {
      if (tweetLength > 140) {
        $('#error').text('Sorry, your tweet is too long!').show();
      }
      // Send user inputs to server when validation is passed
      else {
        const serializedData = $(this).serialize();
        $.post('/tweets', serializedData)
        .then((resp) => {
          console.log(resp);
          loadtweets();
        })
        $('#tweet-text').val('');
        $('.counter').val(140);
      }
    }
  });
})