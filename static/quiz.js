function display_quiz_q(q) {
  let $q_details = $("#q_details");

  let question_number = $("<div>")
    .attr("name", q["id"])
    .attr("id", "question-num")
    .addClass("header")
    .text("Question " + q["id"] + " out of 2");

  let question_content = $("<div>")
    .addClass("quiz-question")
    .text(q["question"]);

  let question_text = $("#q-question");
  question_text.append(question_number);
  question_text.append(question_content);

  let $width = (12 / (q["media"].length + 1)).toString();

  let quiz_options = $("#q-options");
  let form = $("<form>");
  for (let option in q["options"]) {
    let newOption = $("<input>", {
      type: "radio",
      id: option,
      name: q["id"],
      value: option,
    });

    let label = $("<label>", { for: option }).text(q["options"][option]);
    form.append(newOption, label, "<br>");
  }
  quiz_options.append(form);

  let submitBtn = $("<button>")
    .text("Submit")
    .addClass("btn btn-primary")
    .attr("type", "submit")
    .attr("id", "submit-button");

  submitBtn.click(function () {
    event.preventDefault();

    let questionId = $("#question-num").attr("name");
    console.log("questionId", questionId);
    let selectedOptionIndex = $(
      "input[name='" + questionId + "']:checked"
    ).val();
    console.log("selectedOptionIndex", selectedOptionIndex);
    if (selectedOptionIndex !== -1) {
      $.ajax({
        type: "POST",
        url: "/save_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: questionId, answer: selectedOptionIndex }),
        success: function (result) {
          // let $next_q = (parseInt(id) + 1).toString();
          // window.location.href = "/quiz/" + $next_q;
          let submitButton = $("#submit-button");
          let nextButton = $("#next-button");

          submitButton.prop("disabled", true);
          nextButton.prop("disabled", false);
          console.log("Answer successfully saved");
        },
        error: function (request, status, error) {
          console.log("Error");
          console.log(request);
          console.log(status);
          console.log(error);
        },
      });
    } else {
      console.log("No answer selected yet");
    }
  });

  $("#button-row").append(submitBtn);

  let nextButton = $("<button>")
    .text("Next")
    .addClass("btn btn-secondary")
    .attr("id", "next-button")
    .prop("disabled", true);

  nextButton.click(function () {
    let questionId = $("#question-num").attr("name");
    let next_q = (parseInt(questionId) + 1).toString();
    window.location.href = "/quiz/" + next_q;
  });
  $("#button-row").append(nextButton);
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

    // let submitButton = document.getElementById("submit-button");
    // submitButton.remove();
    // let nextButton = document.createElement("button");
    // nextButton.textContent = "Next";
    // document.getElementById("q-details").appendChild(nextButton);
    // let submitButton = $("#submit-button");
    // submitButton.prop("disabled", true);

    // let nextButton = $("<button>").text("Next");
    // $("#q_details").append(nextButton);
  }
}

function display_result_text(c) {
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
