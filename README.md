# personal-website
This is the repository for my personal website. It's designed to be pretty static, so that it can be easily deployed to an AWS S3 bucket. The exception to this is the contact page, which has two options: A static one that reveals your email address in the code, and a dynamic one that requires an AWS Lambda setup to utilize.

**Note that the email provided in the configuration is an anti-spam email! Do not try to send emails to it.**

## Setup
### Static Setup
This section describes how to setup the purely static version of the website. Note that when doing so, your email address will be visible in the website's code! Note that if you are using Formspree Gold, you will need to supply a Google Recaptcha key as well!
#### AWS S3
1. Ensure that the static variable is set to true in the **config.json** file.
2. Ensure that you have provided a valid email for the user\_email and formspree\_gold variable in the **config.json** file.
3. Fill out the rest of the **config.json** file to your content.
4. Upload the project to your S3 bucket, and then follow their tutorials for setting up a domain for the website.

#### GitHub
1. For hosting on GitHub, clone this project to start.
2. Ensure that the static variable is set to true in the **config.json** file.
3. Ensure that you have provided a valid email for the user\_email and formspree\_gold variable in the **config.json** file.
4. Fill out the rest of the **config.json** file to your content.
5. Upload the project to your S3 bucket, and then follow their tutorials for setting up a domain for the website.
6. Follow GitHub's directions for setting up a personal site through them.
7. Navigate to http://username.github.io/personal-website to view the page (Don't forget to replace "username" with your GitHub username!)

### Dynamic Setup
This section describes how to setup the website so that certain parts of the website can be done dynamically (ie: On an external server). This is of benifit as it can help keep personal information (such as your email address) private since it won't appear anywhere on the website (even in its code)! This is great for several reasons:

* Spam bots won't be able to search your page for any personal information.
* You can add additional logic to any server side components without needing to update the code in this project.
* You can also add additional processing for anything going through it (such as creating a report about how many emails you are receiving).

#### AWS Lambda
TBD