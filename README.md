# personal-website
This is the repository for my personal website. It's designed to be pretty static, so that it can be easily deployed to an AWS S3 bucket. The exception to this is the contact page, which has two options: A static one that reveals your email address in the code, and a dynamic one that requires an AWS Lambda setup to utilize.

## Setup
### Static Setup
This section describes how to setup the purely static version of the website. Note that when doing so, your email address will be visible in the website's code!
#### AWS S3
Setup for this is easy: Just update the config.json file with your information, and upload the project to S3! Then use their tutorials for setting up a domain for the website, and voila, you're all set to go!
#### GitHub
For hosting on GitHub, clone this project, update the config.json file, and then navigate to http://username.github.io/personal-website to view the page (Don't forget to replace "username" with your GitHub username!)!
### Dynamic Setup
This section describes how to setup the website so that certain parts of the website can be done dynamically (ie: On an external server). This is of benifit as it can help keep personal information (such as your email address) private since it won't appear anywhere on the website (even in its code)! This is great for several reasons:

* Spam bots won't be able to search your page for any personal information.
* You can add additional logic to any server side components without needing to update the code in this project.
* You can also add additional processing for anything going through it (such as creating a report about how many emails you are receiving).

#### AWS Lambda
TBD