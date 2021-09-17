/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
  if (tweets.length > 0) {
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
    <section class = tweeter-content>${tweetObj.content.text}</section>
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
