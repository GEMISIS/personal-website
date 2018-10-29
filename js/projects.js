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

            if (project.video_url || project.video_urls) {
                if (project.video_url) {
                    if (!project.video_urls) {
                        project.video_urls = [];
                    }
                    project.video_urls.push(project.video_url);
                }
                var videoIDs = [];
                var videoTitles = [];
                var videoTypes = [];

                // Iterate through each id.
                var youtubeRegEx = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var vimeoRegEx = /^.*(vimeo.com\/|video\/)([^#\&\?]*).*/;
                var nativeVideoRegEx = /^.*(.mp4|.ogg|.webm)([^#\&\?]*).*/;
                for (var i = 0; i < project.video_urls.length; i++) {
                    var videoID = project.video_urls[i].url.match(youtubeRegEx);
                    if (videoID && videoID[2].length === 11) {
                        videoIDs.push(videoID[2]);
                        videoTitles.push(project.video_urls[i].title);
                        videoTypes.push("youtube");
                        continue;
                    }
                    var videoID = project.video_urls[i].url.match(vimeoRegEx);
                    if (videoID && videoID[2].length === 9) {
                        videoIDs.push(videoID[2]);
                        videoTitles.push(project.video_urls[i].title);
                        videoTypes.push("vimeo");
                        continue;
                    }
                    var videoID = project.video_urls[i].url.match(nativeVideoRegEx);
                    console.log(videoID);
                    if (videoID) {
                        videoIDs.push(project.video_urls[i].url);
                        videoTitles.push(project.video_urls[i].title);
                        videoTypes.push("webvideo");
                        continue;
                    }
                }

                // Create some space between each URL and create the Video link.
                if (videoIDs.length > 0) {
                    var videoSpaceSpan = document.createElement("span");
                    videoSpaceSpan.innerHTML = " ";
                    projectContentDiv.appendChild(videoSpaceSpan);

                    var videoModalLink = document.createElement("a");
                    videoModalLink.setAttribute("href", "#");
                    videoModalLink.setAttribute("data-toggle", "modal");
                    videoModalLink.setAttribute("data-target", "#videoModal");
                    videoModalLink.setAttribute("data-modal-title", project.name);
                    videoModalLink.setAttribute("data-video-titles", videoTitles.toString());
                    videoModalLink.setAttribute("data-video-ids", videoIDs.toString());
                    videoModalLink.setAttribute("data-video-types", videoTypes.toString());
                    videoModalLink.innerHTML = "Videos";
                    projectContentDiv.appendChild(videoModalLink);
                }
            }

            if (project.image_url) {
                var imageSpaceSpan = document.createElement("span");
                imageSpaceSpan.innerHTML = " ";
                projectContentDiv.appendChild(imageSpaceSpan);

                var imageModalLink = document.createElement("a");
                imageModalLink.setAttribute("href", "#");
                imageModalLink.setAttribute("data-toggle", "modal");
                imageModalLink.setAttribute("data-target", "#imageModal");
                imageModalLink.setAttribute("data-image-title", project.name);
                imageModalLink.setAttribute("data-image-url", project.image_url);
                imageModalLink.innerHTML = "Images";
                projectContentDiv.appendChild(imageModalLink);
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

function generateWebVideo(videoURL) {
    var videoIFrame = document.createElement("video");
    videoIFrame.setAttribute("id", "modalVideo");
    videoIFrame.setAttribute("src", videoURL);
    videoIFrame.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: 0; left: 0; margin-left: auto; margin-right: auto; display: block;");
    videoIFrame.setAttribute("controls", "");
    videoIFrame.setAttribute("allowfullscreen", "");
    videoIFrame.setAttribute("mozallowfullscreen", "");
    videoIFrame.setAttribute("webkitallowfullscreen", "");
    return videoIFrame;
}

function setupModal() {
    $('#imageModal').on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget);
        var imageTitle = button.data("image-title");
        var imageURL = button.data("image-url");
        var modal = $(this);
        console.log("Modal displaying!");
        console.log("URL: " + imageURL);
        modal.find("#modalTitle").text(imageTitle + " Images");
        modal.find("#modalImage").attr("src", imageURL);
    });
    $('#videoModal').on("show.bs.modal", function(event) {
        var button = $(event.relatedTarget);
        var modalTitle = button.data("modal-title");
        var videoTitles = button.data("video-titles").split(",");
        var videoIDs = button.data("video-ids").toString().split(",");
        var videoTypes = button.data("video-types").split(",");
        var modal = $(this);
        modal.find("#modalTitle").text(modalTitle + " Videos");

        for (var i = 0; i < videoIDs.length; i++) {
            var videoID = videoIDs[i];
            var videoTitle = videoTitles[i];
            var videoType = videoTypes[i];

            // Create our tab first.
            var navItem = document.createElement("li");
            navItem.setAttribute("class", "nav-item");
            modal.find("#videoModalTabs").append(navItem);

            var navLink = document.createElement("a");
            navLink.setAttribute("class", "nav-link" + ((i === 0) ? " active" : ""));
            navLink.setAttribute("id", videoID + "-tab");
            navLink.setAttribute("data-toggle", "tab");
            navLink.setAttribute("href", "#" + videoID + "-panel");
            navLink.setAttribute("role", "tab");
            navLink.setAttribute("aria-controls", videoID + "-panel");
            navLink.setAttribute("aria-selected", ((i === 0) ? "true" : "false"));
            navLink.innerText = videoTitle;
            navItem.appendChild(navLink);

            // Now create the tabs panael to display the video in.
            var videoTabDiv = document.createElement("div");
            videoTabDiv.setAttribute("class", "tab-pane fade" + ((i === 0) ? " show active" : ""));
            videoTabDiv.setAttribute("id", videoID + "-panel");
            videoTabDiv.setAttribute("role", "tabpanel");
            videoTabDiv.setAttribute("aria-labelledby", videoID + "-tab");
            videoTabDiv.setAttribute("style", "position: relative; width: 100%; height: 0; padding-bottom: 56.25%;");
            modal.find("#videoModalBody").append(videoTabDiv);

            switch(videoType) {
                case "vimeo":
                    videoTabDiv.appendChild(generateVimeoIFrame(videoID));
                    break;
                case "webvideo":
                    videoTabDiv.appendChild(generateWebVideo(videoID));
                    break;
                case "youtube":
                default:
                    videoTabDiv.appendChild(generateYouTubeIFrame(videoID));
                    break;
            }
        }
    });
    $('#videoModal').on("hide.bs.modal", function(event) {
        var modal = $(this);
        modal.find("#videoModalTabs").empty();
        modal.find("#videoModalBody").empty();
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

