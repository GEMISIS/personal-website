function setupContact(activePage) {
    $.getJSON('configs/config.json', function(data) {
        document.getElementById("bio_name").innerHTML = "About " + data.user;
        document.getElementById("bio_pic").setAttribute("src", data.user_picture);

        if (data.static) {
            var receipt = document.getElementById("contact_send_receipt");
            receipt.parentNode.removeChild(receipt);
            if (!data.formspree_gold) {
                document.getElementById("contact_form").setAttribute("action", "//formspree.io/" + data.user_email);
            }
        } else {
            // TODO dynamic
        }
        if (!data.static || data.formspree_gold) {
            document.getElementById("submit_button").classList.add("g-recaptcha");
            document.getElementById("submit_button").setAttribute("data-sitekey", data.site_keys.google_recaptcha_key);
        }

        var subject_section = document.getElementById("contact_subject");
        for(var subject in data.contact_subjects) {
            var subject_element = document.createElement("option");
            if (data.static && !data.formspree_gold) {
                subject_element.setAttribute("value", data.contact_subjects[subject]);
            } else {
                subject_element.setAttribute("value", subject);
            }
            subject_element.innerHTML = data.contact_subjects[subject];
            subject_section.appendChild(subject_element);
        }

        var bio_paragraph = document.createElement("p");
        bio_paragraph.innerHTML = data.user_bio;
        document.getElementById("bio_text").appendChild(bio_paragraph);
    });
}

function showToast(message, success) {
    var toast = document.getElementById("toast");
    toast.className = "toast show";
    toast.innerHTML = message;
    if(success === true) {
        toast.style.backgroundColor = "green";
    } else {
        toast.style.backgroundColor = "red";
    }
    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

function captchaSuccess(grc) {
    $.getJSON('configs/config.json', function(data) {
        if (data.static) {
            if (data.formspree_gold) {
                var form_data = {
                    email: $("#contact_email").val(),
                    _subject: data.contact_subjects[$("#contact_subject").val()],
                    name: $("#contact_name").val(),
                    message: $("#contact_message").val()
                };
                $.ajax({
                    type: "POST",
                    url: "//formspree.io/" + data.user_email,
                    dataType: "json",
                    data: form_data,
                    success: function () {
                        showToast("Email sent!", true);
                    },
                    error: function () {
                        showToast("Error sending email!", false);
                    }
                });
            }
        } else {
            showToast("Email not sent! Dynamic sites are not supported currently!", false);
        }
    });
}
