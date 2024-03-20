$(document).ready(function () {
  $("#editBtn").click(function () {
    var dataId = $("#dataId").val();
    window.location.href = "/edit/" + dataId;
  });
});
