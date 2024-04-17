function display_result_text(c, count) {
  let $result_text = $("#result_text");
  let $group = $("<div>").addClass("center");
  $group.append($("<div>").text("You scored " + c + " out of " + count));
  if (parseInt(c) < 2) {
    $group.append(
      $("<div>").text(
        "If you think you can do better, review the material and then try again!"
      )
    );
  } else {
    $group.append($("<div>").text("Great job!"));
  }
  $result_text.append($group);
}

$(document).ready(function () {
  display_result_text(correct_count, q_count);
  $("#home-button").click(function () {
    window.location.href = "/";
  });
});
