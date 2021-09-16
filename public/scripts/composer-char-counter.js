$(document).ready(function(){
  renderTweets(data);

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
  });

  $("form").submit(function(event) {
    console.log($("counter").textContent);
    if ($("counter") === 140) {
      const msg = "Your tweet cannot be empty.";
      console.log(msg);
      /*how to display the msg???*/
      return false
    }
    if ($("counter") < 0) {
      const msg = "Your tweet is too long.";
      /*how to display the msg???*/
      console.log(msg);
      return false
    }
    event.preventDefault();
  });
  
});