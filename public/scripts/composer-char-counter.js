$(document).ready(function () {
  // Display the number of characters typed in
  $("#tweet-text").on("input", function () {
    const count = 140 - this.value.length;
    // Check counter and change colors appropriately
    $(".counter").each(function () {
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
    $("#error").slideUp();
  });
});
