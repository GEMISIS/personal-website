var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
    ];

function generateTimeline() {
    $.getJSON('config.json', function(data) {
        var timelineItems = data.user_timeline;

        if (data.timeline_settings.chronological) {
            timelineItems.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });
        } else {
            timelineItems.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }

        document.getElementById("timeline_description").innerHTML = data.timeline_settings.description;

        var inverted = false;
        for (var i = 0;i < timelineItems.length;i++) {
            var item = timelineItems[i];

            // Create our list item.
            var listItem = document.createElement("li");
            if (inverted) {
                listItem.setAttribute("class",
                    "timeline-inverted");
            }
            inverted = !inverted;
            document.getElementById("timeline_items").appendChild(listItem);

            // Create our image area first.
            var imageDiv = document.createElement("div");
            imageDiv.setAttribute("class", "timeline-image");
            listItem.appendChild(imageDiv);

            var image = document.createElement("img");
            image.setAttribute("class", "rounded-circle img-fluid");
            if (item.image !== undefined) {
                image.setAttribute("src", item.image);
            } else {
                switch (item.type) {
                    default:
                        image.setAttribute("src", data.user_picture);
                        break;
                }
            }
            image.setAttribute("alt", item.altText === undefined ? "" : item.altText);
            imageDiv.appendChild(image);

            // Now create the rest of the panel.
            var timelinePanelDiv = document.createElement("div");
            timelinePanelDiv.setAttribute("class", "timeline-panel");
            listItem.appendChild(timelinePanelDiv);

            // Create the heading first.
            var timelinePanelHeadingDiv = document.createElement("div");
            timelinePanelHeadingDiv.setAttribute("class", "timeline-heading");
            timelinePanelDiv.appendChild(timelinePanelHeadingDiv);

            var date = document.createElement("h4");
            var d = new Date(item.date);
            // Note the use of UTC here. This is
            // to ensure that the dates carried over
            // from the config.json file maintain the
            // proper timezones, otherwise certain dates can look wonky..
            date.innerHTML = months[d.getUTCMonth()] + ", " + d.getUTCFullYear();
            var title = document.createElement("h3");
            title.setAttribute("class", "heading");
            title.innerHTML = item.title;
            var subtitle = document.createElement("h4");
            subtitle.setAttribute("class", "subheading");
            subtitle.innerHTML = item.subtitle;
            timelinePanelHeadingDiv.appendChild(date);
            timelinePanelHeadingDiv.appendChild(title);
            timelinePanelHeadingDiv.appendChild(subtitle);

            // Finally, create the body.
            var timelineBodyDiv = document.createElement("div");
            timelineBodyDiv.setAttribute("class", "timeline-body");
            timelinePanelDiv.appendChild(timelineBodyDiv);

            var description = document.createElement("p");
            description.setAttribute("class", "text-muted");
            description.innerHTML = item.description;
            timelineBodyDiv.appendChild(description);

            // Create a line to the next bubble.
            if (i < timelineItems.length - 1) {
                var line = document.createElement("div");
                line.setAttribute("class", "line");
                listItem.appendChild(line);
            }
        }
    });
}

