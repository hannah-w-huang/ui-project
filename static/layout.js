$(document).ready(function () {
  $("#searchButton").click(function () {
    // Get the value entered in the search input
    let searchValue = $("#searchInput").val().trim();
    if (searchValue === "") {
      $("#searchInput").val(""); // Clear whitespace from input field
      $("#searchInput").focus(); // Keep focus on the input field
    } else {
      window.location.href =
        "/search_results?query=" + encodeURIComponent(searchValue);
      // $.ajax({
      //   url: "/search",
      //   method: "GET",
      //   data: { search: searchValue },
      //   success: function (response) {
      //     // Handle the response

      //   },
      // });
    }
  });
});
