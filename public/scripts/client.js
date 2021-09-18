/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  if (tweets.length > 0) {
    $('#tweets-container').empty();
    tweets.forEach(item => {
      const $tweet = createTweetElement(item);
      $('#tweets-container').prepend($tweet);
    })
  }
}

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
    <section class = tweeter-content> ${escape(tweetObj.content.text)}</section>
    <footer>
      <time class="timeago"> ${timeago.format(new Date(tweetObj.created_at))}</time>
      <p>
        <i class="fa fa-flag"></i>
        <i class="fa fa-heart"></i>
        <i class="fa fa-retweet"></i>
      </p>
    </footer>
  </article>`;
  return $tweetArticle;
};

const loadtweets = () => {$.ajax({
  url: '/tweets',
  method: "GET",
  dataType: "json",
  success: (tweets) => {
    const $tweet = createTweetElement(tweets[0]);
    $container = $('#tweets-container');
    $container.prepend($tweet);
    renderTweets(tweets);
  },
  error: (error) => {
    console.log(error);
  }
})}

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};