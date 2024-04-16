function display_exercise(exercise_id) {
    console.log(exercise_id);

    $.ajax({
        type: "POST",
        url: "/learn_lower/" + exercise_id.toString(),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(exercise_id.toString()),
        success: function(data) {
            $('#exercise_name').text(data.name);
            $('#exercise_motion').text(data.motion);
            $('#exercise_muscles').text(data.muscles);
            $('#exercise_video').attr('src', data.video);
            $('#exercise_image').attr('src', data.image);
            $('#completion_status_lower').text(data.completion + "% complete");
            current_exercise_id = exercise_id; 

            if (exercise_id > 5 && exercise_id <= 8) {
                $('#prev_button').show();
            } else {
                $('#prev_button').hide();
            }

            if (exercise_id < 8) {
                $('#next_or_home_button').text("Next Exercise");
            } else {
                $('#next_or_home_button').text("Lower Body Home");
            }

            history.pushState(null, null, "/learn_lower/" + exercise_id.toString());
            localStorage.setItem('lower_body_current_exercise_id', current_exercise_id);
        },
        error: function(request, status, error) {
            console.log("Error");
            console.log(request);
            console.log(status);
            console.log(error);
        }
    });
}

function update_local_storage() {
    localStorage.setItem('lower_body_current_exercise_id', current_exercise_id);
}

$(document).ready(function() {
    let current_exercise_id = localStorage.getItem('lower_body_current_exercise_id') || 5;

    display_exercise(current_exercise_id); 

    $('#next_or_home_button').click(function(e) {
        e.preventDefault();
        if (current_exercise_id < 8) {
            current_exercise_id++;
            display_exercise(current_exercise_id); 
            update_local_storage();
        } else if (current_exercise_id === 8) {
            window.location.href = '/lower_body'; 
        }
    });

    $('#prev_button').click(function(e) {
        e.preventDefault();
        if (current_exercise_id > 5 && current_exercise_id <= 8) {
            current_exercise_id--;
            display_exercise(current_exercise_id); 
            update_local_storage();
        }
    });
});

