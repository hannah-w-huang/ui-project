function display_exercise(exercise_id) {
    console.log(exercise_id);

    $.ajax({
        type: "POST",
        url: "/learn_upper/" + exercise_id.toString(),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(exercise_id.toString()),
        success: function(data) {
            $('#exercise_name').text(data.name);
            $('#exercise_motion').text(data.motion);
            $('#exercise_muscles').text(data.muscles);
            $('#exercise_video').attr('src', data.video);
            $('#exercise_image').attr('src', data.image);
            $('#completion_status_upper').text(data.completion + "% complete");
            current_exercise_id = exercise_id; 

            if (exercise_id > 1 && exercise_id <= 4) {
                $('#prev_button').show();
            } else {
                $('#prev_button').hide();
            }

            if (exercise_id < 4) {
                $('#next_or_home_button').text("Next Exercise");
<<<<<<< HEAD
                $('#upper_to_lower_button').hide()
            } else {
                $('#next_or_home_button').text("Upper Body Home");
                $('#upper_to_lower_button').show()
=======
                $('upper_to_lower_button').hide()
            } else {
                $('#next_or_home_button').text("Upper Body Home");
                $('upper_to_lower_button').show()
>>>>>>> 912d68e (add btns linking to next section)
            }

            history.pushState(null, null, "/learn_upper/" + exercise_id.toString());
            localStorage.setItem('upper_body_current_exercise_id', current_exercise_id);
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
    localStorage.setItem('upper_body_current_exercise_id', current_exercise_id);
}

$(document).ready(function() {
    let current_exercise_id = localStorage.getItem('upper_body_current_exercise_id') || 1;

    $('#upper_to_lower_button').click(function(e) {
        e.preventDefault();
        window.location.href = '/lower_body'; 
    });

    display_exercise(current_exercise_id); 

    $('#next_or_home_button').click(function(e) {
        e.preventDefault();
        if (current_exercise_id < 4) {
            current_exercise_id++;
            display_exercise(current_exercise_id); 
            update_local_storage();
        } else if (current_exercise_id === 4) {
            window.location.href = '/upper_body'; 
        }
    });

    $('#prev_button').click(function(e) {
        e.preventDefault();
        if (current_exercise_id > 1 && current_exercise_id <= 4) {
            current_exercise_id--;
            display_exercise(current_exercise_id); 
            update_local_storage();
        }
    });
});

