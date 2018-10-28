# personal-website
This is the repository for my personal website. It's designed to be pretty static, so that it can be easily deployed to an AWS S3 bucket. The exception to this is the contact page, which has two options: A static one that reveals your email address in the code, and a dynamic one that requires an AWS Lambda setup to utilize.

**Note that the email provided in the configuration is an anti-spam email! Do not try to send emails to it.**

## Supported Formats
### RSS Feeds Default Images
RSS feeds are supported for any RSS feeds, but this project checks for the following domains, and adds nicer default images if no cover image is provided for a feed item:
- Medium.com
- Blogspot.com
- Wordpress.com

## Setup
### Base Setup
You will need to do these steps, no matter which setup type you use!

1. Fork the project for yourself.
2. Modify all of the JSON configuration files in the config folder to your desired settings. 
3. If you decide to use a static site, ensure that you have provided a valid email for the **user\_email** variable and have said whether you are using **formspree\_gold**. Otherwise fill out the dynamic variables.

Note that if you are using Formspree Gold, you will need to supply a Google Recaptcha key as well!

#### Static Setup
This section describes how to setup the purely static version of the website. Note that when doing so, your email address will be visible in the website's code!
##### AWS S3
1. Simply upload the project to your S3 bucket, and then follow their tutorials for setting up a domain for the website.

##### GitHub
1. Follow GitHub's directions for setting up a personal site through them.
2. Navigate to http://username.github.io/personal-website to view the page (Don't forget to replace "username" with your GitHub username!)

#### Dynamic Setup
This section describes how to setup the website so that certain parts of the website can be done dynamically (ie: On an external server). This is of benifit as it can help keep personal information (such as your email address) private since it won't appear anywhere on the website (even in its code)! This is great for several reasons:

* Spam bots won't be able to search your page for any personal information.
* You can add additional logic to any server side components without needing to update the code in this project.
* You can also add additional processing for anything going through it (such as creating a report about how many emails you are receiving).

##### AWS Lambda
TBD