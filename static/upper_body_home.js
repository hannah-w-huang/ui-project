$(document).ready(function() {
    localStorage.clear();
    $('#start_upper_btn').click(function(e) {
        e.preventDefault();
        window.location.href = "/learn_upper/" + "1"; 
    });
});