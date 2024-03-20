$(document).ready(function () {
  let suggestionIds = ["8", "5", "7"];

  function createSuggestionImgCol(imgId, linkURL) {
    let newDiv = $("<div>").addClass("col-md-4");
    let img = $("<img>").attr("src", data[imgId]["image"]);
    img.addClass("img-fluid");
    img.on("click", function () {
      window.location.href = linkURL;
    });

    let name = $("<div>").text(data[imgId]["title"]);
    img.attr("alt", data[imgId]["title"]);

    newDiv.append(img);
    newDiv.append(name);
    $("#randomData").append(newDiv);
  }

  suggestionIds.forEach(function (id) {
    createSuggestionImgCol(id, "view/" + id);
  });

  // let randomLink = $("<a>")
  //   .attr("href", "/view/" + "1")
  //   .text(data["1"]["title"]);
  // $("#randomData").append(randomLink).append("<br>");

  // randomLink = $("<a>")
  //   .attr("href", "/view/" + "2")
  //   .text(data["2"]["title"]);
  // $("#randomData").append(randomLink).append("<br>");

  // randomLink = $("<a>")
  //   .attr("href", "/view/" + "3")
  //   .text(data["3"]["title"]);
  // $("#randomData").append(randomLink).append("<br>");
});
