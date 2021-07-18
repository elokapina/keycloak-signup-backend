
function validate(username, email, email2) {
    if (!username.length || !email.length || !email2.length) {
        return "Username or email cannot be empty.";
    }
    if (email !== email2) {
        return "Emails do not match.";
    }
    if (!/^[a-z0-9-_\.]{1,30}$/.test(username)) {
        return "Username should be under 30 characters and only compose of the characters a-z, 0-9 and .-_.";
    }
    // From https://emailregex.com/
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        return "Email doesn't look valid."
    }
}

$(function() {
    $("#username-input").change(function() {
        $("#error-text").html("");
    });
    $("#email-input").change(function() {
        $("#error-text").html("");
    });
    $("#email-input2").change(function() {
        $("#error-text").html("");
    });

    $("#submit-button").click(function(ev) {
        ev.preventDefault();
        $("#submit-button").prop("disabled", true).addClass("is-loading");
        var username = $("#username-input").val();
        var email = $("#email-input").val();
        var email2 = $("#email-input2").val();
        var error = validate(username, email, email2);
        if (error) {
            $("#error-text").html(error);
            return;
        }

        $.post(window.location.pathname, {
            username,
            email,
            requestToken,
        }, function(data, status) {
            console.log(data, status);
            $("#submit-button").prop("disabled", false).removeClass("is-loading");
        });
    });
});
