$(document).ready(function () {
  $("#editForm").submit(function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // Reset error messages
    $(".form-text").text("");

    // Validate form fields
    let dataId = $("#dataId").val();
    let title = $("#title").val().trim();
    let description = $("#description").val().trim();
    let website = $("#website").val().trim();
    let image = $("#image").val().trim();
    let location = $("#location").val().trim();
    let student = $("#student").val().trim();
    let adult = $("#adult").val().trim();
    let ticket = $("#ticket").val().trim();
    let exhibit = $("#exhibit").val().trim();
    let types = $("#types").val().trim();

    let exhibitArray = exhibit.split(",").map(function (e) {
      return e.trim();
    });

    let typesArray = types.split(",").map(function (type) {
      return type.trim();
    });

    if (
      !title ||
      !description ||
      !image ||
      !location ||
      !student ||
      !adult ||
      !ticket ||
      !website ||
      !types ||
      !exhibit
    ) {
      if (!title) {
        $("#titleError").text("Title is required");
      }
      if (!image) {
        $("#imageError").text("Image link is required");
      }
      if (!location) {
        $("#locationError").text("Location is required");
      }
      if (!description) {
        $("#descriptionError").text("Description is required");
      }
      if (!student) {
        $("#studentError").text("Student ticket price is required");
      }
      if (!adult) {
        $("#adultError").text("Student ticket price is required");
      }
      if (!ticket) {
        $("#ticketError").text("Ticket fee notes are required");
      }

      if (!website) {
        $("#websiteError").text("Website is required");
      }
      if (!exhibit) {
        $("#exhibitError").text("At least one exhibit is required");
      }

      if (!types) {
        $("#typesError").text("At least one type or art is required");
      }

      return;
    }
    // Validate admission fees
    if (isNaN(adult) || isNaN(student)) {
      if (isNaN(adult)) {
        $("#adultError").text("Adult admission must be a number");
      }
      if (isNaN(student)) {
        $("#studentError").text("Student admission must be a number");
      }
      return;
    }

    let formData = {
      id: dataId,
      title: title,
      description: description,
      website: website,
      student_admission: student,
      adult_admission: adult,
      fee_notes: ticket,
      location: location,
      image: image,
      popular_exhibits: exhibitArray,
      art_types: typesArray,
    };
    console.log(formData);

    // Send the data to the server using AJAX
    $.ajax({
      type: "POST",
      url: "/edit/" + dataId,
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(formData),
      success: function (response) {
        // Handle success response from the server
        // alert("Data saved successfully!");
        window.location.href = "/view/" + response.id;
      },
      error: function (xhr, status, error) {
        // Handle error response from the server
        console.log("Error: " + error);
      },
    });
  });

  // Discard Changes button click handler
  $("#discardChangesBtn").click(function () {
    $("#discardConfirmationModal").modal("show");
  });

  // Discard Changes confirmation button click handler
  $("#discardChangesConfirmBtn").click(function () {
    // Hide modal
    $("#discardConfirmationModal").modal("hide");

    // Redirect to the view page
    var dataId = $("#dataId").val();
    window.location.href = "/view/" + dataId;
  });
});
