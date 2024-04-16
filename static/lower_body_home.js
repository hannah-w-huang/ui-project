$(document).ready(function() {
    localStorage.clear();
    $('#start_lower_btn').click(function(e) {
        e.preventDefault();
        window.location.href = "/learn_lower/" + "5"; 
    });
});