function display_result_text(c, count) {
  let $result_text = $("#result_text");
  let $group = $("<div>").addClass("center");
  $group.append($("<div>").text("You scored " + c + " out of " + count));
  if (parseInt(c) < 2) {
    $group.append(
      $("<div>")
        .text(
          "If you think you can do better, review the material and then try again!"
        )
        .addClass("gray-font")
    );
  } else {
    $group.append($("<div>").text("Great job!"));
  }
  $result_text.append($group);
}

function display_previous_results(prev_results) {
  let $prev_results_table = $("#prev_results_table");
  Object.keys(prev_results).forEach(function (attempt) {
    let $row = $("<div>").addClass("row");
    $row.append(
      $(
        "<div class='col-4'>" +
          attempt +
          "</div><div class='col-4'>" +
          prev_results[attempt]["correct"] +
          "</div><div class='col-4'>" +
          prev_results[attempt]["percent"] +
          "%" +
          "</div>"
      )
    );
    $prev_results_table.append($row);
  });
}

$(document).ready(function () {
  display_result_text(correct_count, q_count);
  display_previous_results(prev_results);
  $("#home-button").click(function () {
    window.location.href = "/";
  });
});
