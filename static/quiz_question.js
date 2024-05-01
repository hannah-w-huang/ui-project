$(document).ready(function () {
  display_quiz_q(requested_q, q_count);
});

function display_quiz_q(q, q_count) {
  console.log(q);
  let question_number = $("<div>")
    .attr("name", q["id"])
    .attr("id", "question-num")
    .addClass("header")
    .text("Question " + q["id"] + " out of " + q_count);

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
      class: "answer-option",
    });

    let label = $("<label>", { for: option }).text(q["options"][option]);
    form.append(newOption, label, "<br>");
  }
  quiz_options.append(form);

  let answer_explanation = $("<div>")
    .text(q["explanation"])
    .attr("id", "explanation")
    .hide();
  quiz_options.append(answer_explanation);

  if (q["media"].length > 0) {
    // $("#video-media").attr("src", q["media"][0]);
    if (q["media"][0].endsWith("=share")) {
      let div = document.createElement("div");
      div.className = "center-video";
      let iframe = document.createElement("iframe");
      iframe.width = "230";
      iframe.height = "460";
      iframe.src = q["media"][0];
      iframe.title = "YouTube video player";
      iframe.allowFullscreen = true;
      div.appendChild(iframe);
      let parentElement = document.getElementById("vid-media");
      parentElement.classList.add("col-4");
      parentElement.appendChild(div);

      if (q["media"].length > 1) {
        let div2 = document.createElement("div");
        div2.className = "center-video";
        let img = document.createElement("img");
        img.src = q["media"][1];
        img.alt = "media-1";
        div2.appendChild(img);
        let parentElement2 = document.getElementById("img-media");
        parentElement2.classList.add("col-4");
        parentElement2.appendChild(div2);
      } else {
        $("#img-media").remove();
      }
    } else {
      let div = document.createElement("div");
      div.className = "center-video";
      let img = document.createElement("img");
      img.src = q["media"][0];
      img.alt = "media-0";
      div.appendChild(img);
      let parentElement = document.getElementById("img-media");
      parentElement.classList.add("col-4");
      parentElement.appendChild(div);
    }
  }

  let submitBtn = $("<button>")
    .text("Submit")
    .addClass("btn btn-primary")
    .attr("type", "submit")
    .attr("id", "submit-button");

  submitBtn.click(function () {
    let questionId = $("#question-num").attr("name");
    let selectedOptionIndex = $(
      "input[name='" + questionId + "']:checked"
    ).val();

    console.log("selectedOptionIndex", selectedOptionIndex);

    if (selectedOptionIndex) {
      checkAnswers(requested_q["id"], requested_q["correct"]);

      $.ajax({
        type: "POST",
        url: "/save_answer",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({ id: questionId, answer: selectedOptionIndex }),
        success: function (result) {
          let submitButton = $("#submit-button");
          let nextButton = $("#next-button");
          let explanation = $("#explanation");

          submitButton.prop("disabled", true);
          nextButton.prop("disabled", false);
          nextButton.removeClass("btn-outline-secondary");
          nextButton.addClass("btn-secondary");
          explanation.show();

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
    .addClass("btn btn-outline-secondary")
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
  let questionId = $("#question-num").attr("name");
  let selectedAnswer = $("input[name='" + questionId + "']:checked").val();

  if (selectedAnswer) {
    $('input[name="' + id + '"]').each(function () {
      // Check if the value of the current input element matches the correct answer
      if ($(this).val() === correctAnswerIdx) {
        $(this).next().addClass("correct");
      } else if ($(this).val() === selectedAnswer) {
        $(this).next().addClass("incorrect");
      }
    });
  }
}
