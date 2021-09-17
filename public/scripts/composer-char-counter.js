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
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData);
    $.post('/', serializedData)
    .then((resp) => {
      console.log(resp);
    })

  });
  
});