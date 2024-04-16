function display_quiz_q(q) {
  let $q_details = $("#q_details");
  let $row1 = $("<div>").addClass("row");
  let $group1 = $("<div>").addClass("col-12");
  $group1.append(
    $("<div>")
      .addClass("question-num")
      .text("Question " + q["id"] + " out of 2")
  );
  $group1.append($("<div>").addClass("quiz-question").text(q["question"]));
  $row1.append($group1);
  let $row2 = $("<div>").addClass("row");
  let $width = (12 / (q["media"].length + 1)).toString();
  for (let media in q["media"]) {
    let $temp_group = $("<div>").addClass("col-" + $width);
    if (media.includes(".png") || media.includes(".jpg")) {
      $temp_group.append(
        $("<img src='" + media + "'>").attr("alt", "img-q-" + q["id"])
      );
    } else {
      $temp_group.addClass("video");
      $temp_group.append($("<source src='" + media + "'>"));
    }
    $row2.append($temp_group);
  }
  let $temp_group = $("<div>").addClass("col-" + $width);
  let $form = "<form id='quizForm'>";
  for (let option in q["options"]) {
    $form =
      $form +
      "<input type='radio' id='" +
      option +
      "' name='" +
      q["id"] +
      "' value='" +
      option +
      "'></input>";

    $form =
      $form +
      "<label for='" +
      option +
      "'>" +
      q["options"][option] +
      "</label><br>";
  }

  $form =
    $form +
    "<button type='button' id='submit-button'" +
    // "onclick='checkAnswers('" +
    // q["id"] +
    // "', '" +
    // q["correct"] +
    // "')
    ">Submit</button></form>";

  $temp_group.append($($form));
  $row2.append($temp_group);
  $q_details.append($row1);
  $q_details.append($row2);
}

function checkAnswers(id, correct) {
  let correctAnswerIdx = correct;
  let selectedAnswer = document.querySelector(
    'input[name="' + id + '"]:checked'
  ).value;

  if (selectedAnswer) {
    let options = document.querySelectorAll('input[name="' + id + '"]');
    options.forEach(function (option) {
      console.log("option " + option.value);
      if (option.value === correctAnswerIdx) {
        option.nextElementSibling.classList.add("correct");
      } else {
        option.nextElementSibling.classList.add("incorrect");
      }
      option.disabled = true;
    });

    let submitButton = document.getElementById("submit-button");
    submitButton.remove();
    let nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.onclick = function () {
      $.ajax({
        type: "POST",
        url: "/save_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: id, answer: selectedAnswer }),
        success: function (result) {
          let $next_q = (parseInt(id) + 1).toString();
          window.location.href = "/quiz/" + $next_q;
        },
        error: function (request, status, error) {
          console.log("Error");
          console.log(request);
          console.log(status);
          console.log(error);
        },
      });
    };
    document.getElementById("quizForm").appendChild(nextButton);
  }
}

function display_result_text(c) {
  console.log("c in display_result_text()" + c);
  let $result_text = $("#result_text");
  let $group = $("<div>").addClass("center");
  $group.append($("<div>").text("You scored " + c + " out of 2."));
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
