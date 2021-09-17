$(document).ready(function() {

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
        $.post('/', serializedData)
        .then((resp) => {
          console.log(resp);
          loadtweets();
        })
      }
    }
  });
  
  $(() => {
    const loadtweets = () => {$.ajax({
      url: '/tweets',
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        const $tweet = addtweet(tweets[0]);
        $container = $('#tweets-container');
        $container.prepend($tweet);
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    })}

    loadtweets();

    const addtweet = (tweet) => {
      const $tweethtml =  `
        <article class="tweet">
          <h4>
            <p>
              <img src="${tweet.user.avatars}"> 
              <label> ${tweet.user.name} </label>
            </p>
            <p> ${tweet.user.handle} </p>
          </h4>
          <section class = tweeter-content>${tweet.content.text}</section>
          <footer>
            <time class="timeago"> ${timeago.format(new Date(tweet.created_at))}</time>
            <p>
              <i class="fa fa-flag"></i>
              <i class="fa fa-heart"></i>
              <i class="fa fa-retweet"></i>
            </p>
          </footer>
        </article>`;

      $('tweet').append($tweethtml);
      const $tweets = $('<article>').addClass('tweet');
      return $tweets;
    }
  })

});