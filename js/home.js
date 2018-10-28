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

function populateDeck(data) {
    var cardDeckDiv = document.getElementById("card_deck");

    for (var i = 0;i < data.items.length && i < 3;i++) {
        var cardDiv = document.createElement("div");
        cardDiv.setAttribute("class", "card");
        cardDeckDiv.appendChild(cardDiv);

        // Create the header image.
        var cardImage = document.createElement("img");
        cardImage.setAttribute("class", "card-img-top");
        var textX = "22125.56666564941406";
        var textY = "22160.19999961853027";
        var width = 505;
        var height = 300;
        var text = "No Image Found";
        cardImage.setAttribute("style", "width: 100%; height: " + height * 0.69 + "px; object-fit: cover;");
        cardImage.setAttribute("src", "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22" + width + "%22%20height%3D%22" + height + "%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20" + width + "%20" + height + "%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166b7013b46%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A25pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166b7013b46%22%3E%3Crect%20width%3D%22" + width + "%22%20height%3D%22" + height + "%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%" + textX + "%22%20y%3D%" + textY + "%22%3E" + text + "%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E");

        var img = new Image();
        img.cardImage = cardImage;
        img.addEventListener("load", function() {
            if (this.naturalWidth > 100 || this.naturalHeight > 100) {
                this.cardImage.setAttribute("src", this.src);
            }
        });
        // img.src = "https://secure.gravatar.com/avatar/8150dfa4d069cdf366386f39cc213327?size=400";
        img.src = data.items[i].thumbnail;
        cardDiv.appendChild(cardImage);

        // Create the body.
        var cardBodyDiv = document.createElement("div");
        cardBodyDiv.setAttribute("class", "card-body");
        cardBodyDiv.setAttribute("style", "max-height: 200px;");
        cardDiv.appendChild(cardBodyDiv);

        var cardTitle = document.createElement("h5");
        cardTitle.setAttribute("class", "card-title");
        cardTitle.innerHTML = data.items[i].title.substring(0, 32) + ((data.items[i].title.length >= 32) ? "..." : "");
        cardBodyDiv.appendChild(cardTitle);

        var cardText = document.createElement("p");
        cardText.setAttribute("class", "card-text");
        cardText.setAttribute("style", "height: 100px; min-height: 100px; max-height: 100px; overflow: hidden;");
        cardText.innerHTML = data.items[i].description.substring(0, 165) + "...";
        cardBodyDiv.appendChild(cardText);

        // Link should go in a separate div to ensure it is at the bottom.
        var cardLinkDiv = document.createElement("div");
        cardLinkDiv.setAttribute("class", "card-body");
        cardLinkDiv.setAttribute("style", "margin-top: 2.5%;");
        cardDiv.appendChild(cardLinkDiv);

        var cardButton = document.createElement("a");
        cardButton.setAttribute("class", "btn btn-primary");
        cardButton.setAttribute("href", data.items[i].link);
        cardButton.setAttribute("target", "_blank");
        cardButton.innerHTML = "Click to Read";
        cardLinkDiv.appendChild(cardButton);

        // Create the footer.
        var cardFooterDiv = document.createElement("div");
        cardFooterDiv.setAttribute("class", "card-footer");
        cardDiv.appendChild(cardFooterDiv);

        var cardFooterText = document.createElement("small");
        cardFooterText.setAttribute("class", "text-muted");
        cardFooterText.innerHTML = "Published: " + data.items[i].pubDate.split(" ")[0];
        cardFooterDiv.appendChild(cardFooterText);
    }
}

function populateRSSCards() {
    $.getJSON('configs/config.json', function(data) {
        $.getJSON({
            url: 'https://api.rss2json.com/v1/api.json',
            data: {
                rss_url: data.rss_link
            },
            success: populateDeck,
            error: function(xhr, status) {
                console.log("Error getting Medium RSS feed!");
            }
        });
    });
}