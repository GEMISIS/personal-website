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
    $.getJSON('configs/experience.json', function(data) {
        var timelineItems = data.items;

        if (data.settings.chronological) {
            timelineItems.sort(function(a, b) {
                return new Date(a.date) - new Date(b.date);
            });
        } else {
            timelineItems.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });
        }

        document.getElementById("timeline_description").innerHTML = data.settings.description;

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
            switch(item.time) {
                default:
                    imageDiv.style.borderColor = "#3b5998";
                    imageDiv.style.backgroundColor  = "#3b5998";
                    break;
                case "start":
                    imageDiv.style.borderColor = "#3b5998";
                    imageDiv.style.backgroundColor  = "#3b5998";
                    break;
                case "end":
                    imageDiv.style.borderColor = "#983b72";
                    imageDiv.style.backgroundColor  = "#983b72";
                    break;
            }
            listItem.appendChild(imageDiv);

            if (item.image !== undefined) {
                var image = document.createElement("img");
                image.setAttribute("class", "rounded-circle img-fluid");
                image.setAttribute("src", item.image);
                image.setAttribute("alt", item.altText === undefined ? "" : item.altText);
                imageDiv.appendChild(image);
            } else {
                var svgTag = document.createElement("svg");
                svgTag.setAttribute("class", "img-fluid");
                svgTag.setAttribute("viewBox", "0 0 256 256");
                svgTag.setAttribute("style", "width: 72%; height: 72%; margin-left: auto; margin-right: auto;");
                imageDiv.appendChild(svgTag);

                var image = document.createElement("object");
                image.setAttribute("data", data.default_icons[item.type]);
                image.setAttribute("type", "image/svg+xml");
                image.setAttribute("width", "100%");
                image.setAttribute("height", "100%");
                image.setAttribute("alt", item.altText === undefined ? "" : item.altText);
                svgTag.appendChild(image);
            }

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

