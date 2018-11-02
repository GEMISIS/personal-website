function populateCards(projects) {
    // Sort the cards first.
    projects.sort(function(a, b) {
        if (a.pushed_at) {
            a.updated_at = a.pushed_at;
        }
        if (b.pushed_at) {
            b.updated_at = b.pushed_at;
        }
        return new Date(b.updated_at) - new Date(a.updated_at);
    });
    var projectDiv = document.getElementById("project_cards");
    projects.forEach(function(project) {
        if (project.name && project.description && !project.fork) {
            var cardCutoutDiv = document.createElement("div");
            cardCutoutDiv.setAttribute("class", "col-md-3");
            projectDiv.appendChild(cardCutoutDiv);

            var cardDiv = document.createElement("div");
            var type = "default";
            var languageText = project.language;
            switch (project.language) {
                case "C#":
                    type = "csharp";
                    languageText = "&nbsp;&nbsp;" + languageText;
                    break;
                case "Unity":
                    type = "csharp";
                    languageText = "Unity";
                    break;
                case "Unreal":
                    type = "cpp";
                    languageText = "Unreal";
                    break;
                case "HTML":
                    type = "html";
                    break;
                case "JavaScript":
                    type = "html";
                    languageText = "JS"
                    break;
                case "Java":
                    type = "java";
                    break;
                case "Android":
                    type = "java";
                    languageText = "Andr."
                    break;
                case "C":
                    languageText = "&nbsp;&nbsp;&nbsp;" + languageText;
                    type = "cpp";
                    break;
                case "C++":
                    languageText = "&nbsp;&nbsp;" + languageText;
                    type = "cpp";
                    break;
                case "Assembly":
                    type = "assembly";
                    languageText = "Asm.";
                    break;
                case "Python":
                    type = "python";
                    languageText = "Pyt."
                    break;
                default:
                    type = "default";
                    languageText = "?";
                    break;
            }
            cardDiv.setAttribute("class", "project project-radius project-" + type);
            cardDiv.setAttribute("style", "height: 375px;");
            cardCutoutDiv.appendChild(cardDiv);

            if (project.language !== "None") {
                var cornerDiv = document.createElement("div");
                cornerDiv.setAttribute("class", "shape");
                cardDiv.appendChild(cornerDiv);

                var cornerTextDiv = document.createElement("div");
                cornerTextDiv.setAttribute("class", "shape-text");
                cornerTextDiv.innerHTML = languageText;
                cornerDiv.appendChild(cornerTextDiv);
            }

            // Setup the cards main text now.
            var projectContentDiv = document.createElement("div");
            projectContentDiv.setAttribute("class", "project-content");
            cardDiv.appendChild(projectContentDiv);

            var projectTitleHeader = document.createElement("h3");
            projectTitleHeader.setAttribute("class", "lead");
            projectTitleHeader.setAttribute("style", "word-wrap: break-word; max-width: 75%;");
            projectTitleHeader.innerHTML = project.name;
            projectContentDiv.appendChild(projectTitleHeader);

            if (project.media_url || project.media_urls) {
                if (project.media_url) {
                    if (!project.media_urls) {
                        project.media_urls = [];
                    }
                    project.media_urls.push(project.media_url);
                }
                var mediaIDs = [];
                var mediaTitles = [];
                var mediaTypes = [];

                // Iterate through each id.
                var youtubeRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var vimeoRegEx = /^.*(vimeo.com\/|video\/)([^#\&\?]*).*/;
                var nativeVideoRegEx = /^.*(.mp4|.ogg|.webm)([^#\&\?]*).*/;
                var imageRegEx = /^.*(.png|.jpg|.jpeg)([^#\&\?]*).*/;
                for (var i = 0; i < project.media_urls.length; i++) {
                    var mediaID = project.media_urls[i].url.match(youtubeRegEx);
                    if (mediaID && mediaID[2].length === 11) {
                        mediaIDs.push(mediaID[2]);
                        mediaTitles.push(project.media_urls[i].title);
                        mediaTypes.push("youtube");
                        continue;
                    }
                    var mediaID = project.media_urls[i].url.match(vimeoRegEx);
                    if (mediaID && mediaID[2].length === 9) {
                        mediaIDs.push(mediaID[2]);
                        mediaTitles.push(project.media_urls[i].title);
                        mediaTypes.push("vimeo");
                        continue;
                    }
                    var mediaID = project.media_urls[i].url.match(nativeVideoRegEx);
                    if (mediaID) {
                        mediaIDs.push(project.media_urls[i].url);
                        mediaTitles.push(project.media_urls[i].title);
                        mediaTypes.push("nativeVideo");
                        continue;
                    }
                    var mediaID = project.media_urls[i].url.match(imageRegEx);
                    console.log(mediaID);
                    if (mediaID) {
                        mediaIDs.push(project.media_urls[i].url);
                        mediaTitles.push(project.media_urls[i].title);
                        mediaTypes.push("image");
                        continue;
                    }
                }

                // Create some space between each URL and create the Video link.
                if (mediaIDs.length > 0) {
                    var mediaSpaceSpan = document.createElement("span");
                    mediaSpaceSpan.innerHTML = " ";
                    projectContentDiv.appendChild(mediaSpaceSpan);

                    var mediaModalLink = document.createElement("a");
                    mediaModalLink.setAttribute("href", "#");
                    mediaModalLink.setAttribute("data-toggle", "modal");
                    mediaModalLink.setAttribute("data-target", "#mediaModal");
                    mediaModalLink.setAttribute("data-modal-title", project.name);
                    mediaModalLink.setAttribute("data-media-titles", mediaTitles.toString());
                    mediaModalLink.setAttribute("data-media-ids", mediaIDs.toString());
                    mediaModalLink.setAttribute("data-media-types", mediaTypes.toString());
                    mediaModalLink.innerHTML = "Media";
                    projectContentDiv.appendChild(mediaModalLink);
                }
            }

            if (project.html_url || project.repo_url) {
                var repoSpaceSpan = document.createElement("span");
                repoSpaceSpan.innerHTML = " ";
                projectContentDiv.appendChild(repoSpaceSpan);

                var projectLink = document.createElement("a");
                projectLink.setAttribute("href", (project.html_url) ? project.html_url : project.repo_url);
                projectLink.setAttribute("target", "_blank");
                projectLink.innerHTML = "Repo";
                projectContentDiv.appendChild(projectLink);
            }

            if (project.releases_url) {
                // Disabled for the time being since this will quickly exceed the GitHub API rate limit.
                // $.getJSON({
                //             url: project.releases_url,
                //             async: false
                //         }, function(download_results) {
                //     if (download_results.length > 0) {
                //         var result = download_results.pop();
                //         var projectLink = document.createElement("a");
                //         projectLink.setAttribute("href", result.url);
                //         projectLink.setAttribute("target", "_blank");
                //         projectLink.innerHTML = "Download";
                //         projectContentDiv.appendChild(projectLink);
                //     }
                // });
            } else if(project.download_url) {
                var downloadSpaceSpan = document.createElement("span");
                downloadSpaceSpan.innerHTML = " ";
                projectContentDiv.appendChild(downloadSpaceSpan);

                var projectLink = document.createElement("a");
                projectLink.setAttribute("href", project.download_url);
                projectLink.setAttribute("target", "_blank");
                projectLink.innerHTML = "Downloads";
                projectContentDiv.appendChild(projectLink);
            }

            projectContentDiv.appendChild(document.createElement("hr"));

            var projectDescriptionParagraph = document.createElement("p");
            projectDescriptionParagraph.innerHTML = project.description;
            projectContentDiv.appendChild(projectDescriptionParagraph);
        }
    });
}

function generateYouTubeIFrame(videoID) {
    var videoIFrame = document.createElement("iframe");
    videoIFrame.setAttribute("id", "modalVideo");
    videoIFrame.setAttribute("src", "https://www.youtube.com/embed/" + videoID);
    videoIFrame.setAttribute("frameborder", "0");
    videoIFrame.setAttribute("class", "d-block mx-auto");
    videoIFrame.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; margin-left: auto; margin-right: auto; display: block;");
    videoIFrame.setAttribute("allow", "autoplay; encrypted-media");
    videoIFrame.setAttribute("allowfullscreen", "");
    videoIFrame.setAttribute("mozallowfullscreen", "");
    videoIFrame.setAttribute("webkitallowfullscreen", "");
    return videoIFrame;
}

function generateVimeoIFrame(videoID) {
    var videoIFrame = document.createElement("iframe");
    videoIFrame.setAttribute("id", "modalVideo");
    videoIFrame.setAttribute("src", "https://player.vimeo.com/video/" + videoID);
    videoIFrame.setAttribute("frameborder", "0");
    videoIFrame.setAttribute("class", "d-block mx-auto");
    videoIFrame.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; margin-left: auto; margin-right: auto; display: block;");
    videoIFrame.setAttribute("allow", "autoplay; encrypted-media");
    videoIFrame.setAttribute("allowfullscreen", "");
    videoIFrame.setAttribute("mozallowfullscreen", "");
    videoIFrame.setAttribute("webkitallowfullscreen", "");
    return videoIFrame;
}

function generateImage(imageURL) {
    var imageElement = document.createElement("img");
    imageElement.setAttribute("id", "modalImage");
    imageElement.setAttribute("src", imageURL);
    imageElement.setAttribute("class", "d-block mx-auto");
    imageElement.setAttribute("style", "max-width: 100%; max-height: 27em;");
    return imageElement;
}

function generateNativeVideo(videoURL) {
    var videoElement = document.createElement("video");
    videoElement.setAttribute("id", "modalVideo");
    videoElement.setAttribute("src", videoURL);
    videoElement.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; margin-left: auto; margin-right: auto; display: block;");
    videoElement.setAttribute("controls", "");
    videoElement.setAttribute("allowfullscreen", "");
    videoElement.setAttribute("mozallowfullscreen", "");
    videoElement.setAttribute("webkitallowfullscreen", "");
    return videoElement;
}

function setupModal() {
    $('#mediaModal').on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget);
        var modalTitle = button.data("modal-title");
        var mediaTitles = button.data("media-titles").split(",");
        var mediaIDs = button.data("media-ids").toString().split(",");
        var mediaTypes = button.data("media-types").split(",");
        var modal = $(this);
        modal.find("#modalTitle").text(modalTitle + " Media");

        for (var i = 0; i < mediaIDs.length; i++) {
            var mediaID = mediaIDs[i];
            var mediaTitle = mediaTitles[i];
            var mediaType = mediaTypes[i];

            // Create our tab first.
            var navItem = document.createElement("li");
            navItem.setAttribute("class", "nav-item");
            modal.find("#mediaModalTabs").append(navItem);

            var navLink = document.createElement("a");
            navLink.setAttribute("class", "nav-link" + ((i === 0) ? " active" : ""));
            navLink.setAttribute("id", mediaID + "-tab");
            navLink.setAttribute("data-toggle", "tab");
            navLink.setAttribute("href", "#" + mediaID + "-panel");
            navLink.setAttribute("role", "tab");
            navLink.setAttribute("aria-controls", mediaID + "-panel");
            navLink.setAttribute("aria-selected", ((i === 0) ? "true" : "false"));
            navLink.innerText = mediaTitle;
            navItem.appendChild(navLink);

            // Now create the tabs panael to display the media in.
            var mediaTabDiv = document.createElement("div");
            mediaTabDiv.setAttribute("class", "tab-pane fade" + ((i === 0) ? " show active" : ""));
            mediaTabDiv.setAttribute("id", mediaID + "-panel");
            mediaTabDiv.setAttribute("role", "tabpanel");
            mediaTabDiv.setAttribute("aria-labelledby", mediaID + "-tab");
            mediaTabDiv.setAttribute("style", "position: relative; width: 100%; height: 0; padding-bottom: 56.25%;");
            modal.find("#mediaModalBody").append(mediaTabDiv);

            switch(mediaType) {
                case "vimeo":
                    mediaTabDiv.appendChild(generateVimeoIFrame(mediaID));
                    break;
                case "nativeVideo":
                    mediaTabDiv.appendChild(generateNativeVideo(mediaID));
                    break;
                case "image":
                    mediaTabDiv.appendChild(generateImage(mediaID));
                    break;
                case "youtube":
                default:
                    mediaTabDiv.appendChild(generateYouTubeIFrame(mediaID));
                    break;
            }
        }
    });
    $('#mediaModal').on("hide.bs.modal", function(event) {
        var modal = $(this);
        // Remove all tabs and anything in the bodies so that videos stop playing.
        modal.find("#mediaModalTabs").empty();
        modal.find("#mediaModalBody").empty();
    });
}

function hideLoadingSpinner() {
    var loadingSpinnerDiv = document.getElementById("loading_spinner");
    loadingSpinnerDiv.parentNode.removeChild(loadingSpinnerDiv);
}

function generateGithubCards() {
    $.getJSON('configs/projects.json', function(config_data) {
        if (config_data.github_username) {
            // Get the list of repos from the user.
            $.getJSON('https://api.github.com/users/' +
                config_data.github_username +
                '/repos?sort=updated&callback=?', function(github_result) {
                    hideLoadingSpinner();

                    if (!github_result.data.message) {
                        localStorage["github_repos"] = JSON.stringify(github_result.data);
                    } else if(localStorage["github_repos"]) {
                        github_result.data = JSON.parse(localStorage["github_repos"]);
                    }
                    if(github_result.data.message && !config_data.projects)
                    {
                        document.getElementById("repo_error").style.display = "";
                    }
                    else
                    {
                        var list = github_result.data;
                        if (config_data.projects) {
                            list = config_data.projects.concat(github_result.data);
                        }
                        populateCards(list);
                    }
            });
        } else if (config_data.projects) {
            hideLoadingSpinner();
            populateCards(config_data.projects);
        } else {
            hideLoadingSpinner();
            document.getElementById("projects_error").style.display = "";
        }
    });
}

