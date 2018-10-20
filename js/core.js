/**
  core.js

  This file contains helper functions for setting up the various web pages. Note the use of createElement instead of jQuery to create the elements. This is because we actually get better performance using this method instead. This should make the pages load much faster! See https://stackoverflow.com/questions/268490/jquery-document-createelement-equivalent for more information.

  */

function generateNavBar(activePage) {
    // Want to add more pages? You can do so here!
    var links = [
        {
            text: "Home",
            url: "index.html"
        },
        {
            text: "Projects",
            url: "projects.html"
        },
        {
            text: "Timeline",
            url: "timeline.html"
        },
        {
            text: "About",
            url: "about.html"
        }
    ];
    links.forEach(function(link) {
        // Create a list item and set its class to nav-item, as well as active if it is the active page.
        var listItem = document.createElement("li");
        var classValue = "nav-item";
        if (activePage === link.text) {
            classValue += " active";
        }
        listItem.setAttribute("class", classValue);

        // We need to create a link item for each list item separately.
        var linkElement = document.createElement("a");
        linkElement.setAttribute("class", "nav-link");
        linkElement.setAttribute("href", link.url);
        linkElement.setAttribute("style", "text-transform: capitalize;");
        linkElement.innerHTML = link.text;
        listItem.appendChild(linkElement);

        // Append each link item to the links section of the navbar.
        document.getElementById("navbar_links").appendChild(listItem);
    });

    // Set the URl for when the user clicks the user name in the top left-hand corner.
    document.getElementById("navbar_brand").setAttribute("href", links[0].url);
}

function createMetaTag(name, content) {
    var name_meta = document.createElement("meta");
    name_meta.setAttribute("name", name);
    name_meta.setAttribute("content", content);
    return name_meta;
}

function setupSocialMediaLinks(socialMediaItems, socialMediaDivElement) {
    socialMediaItems.forEach(function(socialMedia) {
        // Create our CSS style tag for when the user hovers over a social media icon.
        var style = document.createElement("style");
        style.type = "text/css";
        style.rel = "stylesheet";
        if (style.stylesheet) {
            style.stylesheet.cssText += "#" + socialMedia.id + ":hover {";
            style.stylesheet.cssText += "color: " + socialMedia.color;
            style.stylesheet.cssText += "}";
        } else {
            style.appendChild(document.createTextNode("#" + socialMedia.id + ":hover {" + "color: " + socialMedia.color + "}"));
        }

        // Create our link tags and icon tags, putting the icon tag into the link tag.
        var link = document.createElement("a");
        link.setAttribute("href", socialMedia.link);
        link.setAttribute("target", "_blank");
        var icon = document.createElement("i");
        icon.setAttribute("class", "fab fa-3x social " + socialMedia.icon);
        icon.setAttribute("id", socialMedia.id);
        link.appendChild(icon);

        // Append the style and link tags for each social media icon to the socialMediaDiv element that was passed in.
        socialMediaDivElement.appendChild(style);
        socialMediaDivElement.appendChild(link);
    });
}

function setupConfig(activePage) {
    $.getJSON('configs/config.json', function(data) {
        // Setup our social media links.
        setupSocialMediaLinks(data.social_medias, document.getElementById("social_media_links"));

        // Create our page title based on the user from our config and the active page.
        var pageTitle = data.user + " - " + activePage;

        // Get our <head> tag.
        var head = document.getElementsByTagName("head")[0];

        // Append on a bunch of meta tags.
        head.appendChild(createMetaTag("author", data.user));
        head.appendChild(createMetaTag("description", data.description));
        head.appendChild(createMetaTag("keywords", data.keywords.join(",")));

        // Create a title meta tag separately since it has some differnt parameters.
        var title_meta = document.createElement("meta");
        title_meta.setAttribute("name", "title");
        title_meta.setAttribute("title", pageTitle);
        head.appendChild(title_meta);

        // Create our <title> tag.
        var title_tag = document.createElement("title");
        title_tag.innerHTML = pageTitle;
        head.appendChild(title_tag);

        // Finally set the name used in the top left-hand corner.
        document.getElementById("navbar_brand").innerHTML = data.user
    });
}

function setupPage(activePage) {
    generateNavBar(activePage);
    setupConfig(activePage);
}

