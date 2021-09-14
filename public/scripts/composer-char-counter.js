$(document).ready(function(){
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
});
