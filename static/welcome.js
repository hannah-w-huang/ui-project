$(document).ready(function () {
    $('#home_to_upper').click(function(e) {
        e.preventDefault();
        window.location.href = '/upper_body'; 
    });

    $('#home_to_lower').click(function(e) {
        e.preventDefault();
        window.location.href = '/lower_body'; 
    });

    $('#home_to_quiz').click(function(e) {
        e.preventDefault();
        window.location.href = '/quiz'; 
    });
});
