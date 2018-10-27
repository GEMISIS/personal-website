function populateHome() {
    $.getJSON('configs/config.json', function(data) {
        var pictureFrameDiv = document.getElementById("picture_frame");
        var image = document.createElement("img");
        image.setAttribute("class", "rounded-circle img-fluid");
        image.setAttribute("style", "max-width: 85%;")
        image.setAttribute("src", data.user_picture);
        pictureFrameDiv.appendChild(image);
    });

    $.getJSON('configs/resumes.json', function(data) {
        var resumeSectionDiv = document.getElementById("resume_section");
        if (data.resumes && data.resumes.length > 0) {
            if (data.hasContactInfo) {
                var resumeContactNoteDiv = document.getElementById("has_contact_info");
                resumeContactNoteDiv.setAttribute("style", "display: none;")
            }
            var resumeMenuDiv = document.getElementById("resume_menu");
            data.resumes.forEach(function(resume) {
                console.log(resume);
                var dropdownItem = document.createElement("a");
                dropdownItem.setAttribute("class", "dropdown-item");
                dropdownItem.setAttribute("href", resume.file);
                dropdownItem.setAttribute("target", "_blank");
                dropdownItem.innerHTML = resume.title;
                resumeMenuDiv.appendChild(dropdownItem);
            });
        } else {
            resumeSectionDiv.setAttribute("style", "display: none;");
        }
    });
}