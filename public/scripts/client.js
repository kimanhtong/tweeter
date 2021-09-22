/****** Section for function declaration ************************************************************/
/****** Function to prevent cross site scripting ********************************/
const escape = function (str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
/******* Function to create an HTML tweet element from JSON data received from server **/
const createTweetElement = function (tweetObj) {
  const $tweetArticle = `
  <article class="tweet">
    <h4>
      <p>
        <img src="${tweetObj.user.avatars}"> 
        <label> ${tweetObj.user.name} </label>
      </p>
      <p> ${tweetObj.user.handle} </p>
    </h4>
    <p class = tweeter-content> ${escape(tweetObj.content.text)}</p>
    <footer>
      <time class="timeago"> ${timeago.format(
        new Date(tweetObj.created_at)
      )}</time>
      <p>
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
      </p>
    </footer>
  </article>`;
  return $tweetArticle;
};
/* Function to display all HTML tweet elements created ************************/
const renderTweets = function (tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  if (tweets.length > 0) {
    $("#tweets-container").empty();
    tweets.forEach((item) => {
      const $tweet = createTweetElement(item);
      $("#tweets-container").prepend($tweet);
    });
  }
};
/* Function to load all the tweets from server to the website **********/
// use AJAX to get JSON data from server
// create and display tweet elements from the data received
// show error if any
const loadtweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweets) => {
      const $tweet = createTweetElement(tweets[0]);
      const $container = $("#tweets-container");
      $container.prepend($tweet);
      renderTweets(tweets);
    },
    error: (error) => {
      console.log(error);
    }
  });
};

/****** Main function ****************************************************************************/
$(document).ready(function () {
  // Load all tweets received from server
  loadtweets();

  // Submit tweet data if user clicks TWEET button
  $("form").submit(function (event) {
    // Prevent form navigation to /tweets link
    event.preventDefault();

    // Validate the length of tweet data must be > 0 and <= 140 characters
    const tweetLength = $("#tweet-text").val().length;
    if (tweetLength === 0) {
      $("#error").text("Sorry, your tweet cannot be blank!").slideDown();
    } else {
      if (tweetLength > 140) {
        $("#error").text("Sorry, your tweet is too long!").slideDown();
      }
      // Send user inputs to server when validation is passed
      else {
        const serializedData = $(this).serialize();
        $.post("/tweets", serializedData).then((resp) => {
          // Receive all tweets including the new one from server, then display them on the website
          loadtweets();
          // Reset the input and counter after all data is sent successfully
          $("#tweet-text").val("");
          $(".counter").val(140);
        });
      }
    }
  });
});
/*********** END *****************************************************************************************/
