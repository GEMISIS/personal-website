function populateCards(projects) {
    var projectDiv = document.getElementById("project_cards");
    for (var project in projects) {
        project = projects[project];
        if (!project.name || !project.description || project.fork) {
            continue;
        }
        var cardCutoutDiv = document.createElement("div");
        cardCutoutDiv.setAttribute("class", "col-md-3");
        projectDiv.appendChild(cardCutoutDiv);

        var cardDiv = document.createElement("div");
        var type = "default";
        var languageText = project.language;
        switch (project.language) {
            case "C#":
                type = "csharp";
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
            case "C":
            case "C++":
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

        if (project.html_url || project.repo_url) {
            var projectLink = document.createElement("a");
            projectLink.setAttribute("href", (project.html_url) ? project.html_url : project.repo_url);
            projectLink.setAttribute("target", "_blank");
            projectLink.innerHTML = "Repo";
            projectContentDiv.appendChild(projectLink);
        }

        var projectLink = document.createElement("span");
        projectLink.innerHTML = " ";
        projectContentDiv.appendChild(projectLink);

        if (project.releases_url) {
            $.getJSON({
                        url: project.releases_url,
                        async: false
                    }, function(download_results) {
                if (download_results.length > 0) {
                    var result = download_results.pop();
                    var projectLink = document.createElement("a");
                    projectLink.setAttribute("href", result.url);
                    projectLink.setAttribute("target", "_blank");
                    projectLink.innerHTML = "Download";
                    projectContentDiv.appendChild(projectLink);
                }
            });
        } else if(project.download_url) {
            var projectLink = document.createElement("a");
            projectLink.setAttribute("href", project.download_url);
            projectLink.setAttribute("target", "_blank");
            projectLink.innerHTML = "Download";
            projectContentDiv.appendChild(projectLink);
        }

        projectContentDiv.appendChild(document.createElement("hr"));

        var projectDescriptionParagraph = document.createElement("p");
        projectDescriptionParagraph.innerHTML = project.description;
        projectContentDiv.appendChild(projectDescriptionParagraph);
    }
}

function generateGithubCards() {
    $.getJSON('config.json', function(config_data) {
        if (config_data.github_username) {
            // Get the list of repos from the user.
            $.getJSON('https://api.github.com/users/' +
                config_data.github_username +
                '/repos?sort=updated&callback=?', function(github_result) {
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
                        list.sort(function(a, b) {
                            return new Date(b.updated_at) - new Date(a.updated_at);
                        });
                        populateCards(list);
                    }
            });
        } else if (config_data.projects) {
            populateCards(config_data.projects);
        } else {
            document.getElementById("projects_error").style.display = "";
        }
    });
}

