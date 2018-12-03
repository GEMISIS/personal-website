# personal-website
This is the repository for my personal website. It's currently designed with an engineering-centric focus for the first iteration. Pages like the Projects Page have some clear bias as the cards really only have tags for engineering projects. Going forward, this will be generalized so that you can define these elsewhere, in order to allow other fields to use this template too (for example: videographers could put demo reels up instead with relevant tags).

It's designed to be pretty static, so that it can be easily deployed to an AWS S3 bucket, or via [GitHub Pages](https://pages.github.com/). The exception to this is the contact page, which has two options: A static version that reveals your email address **only in the code**, and a dynamic one that requires an AWS Lambda setup to utilize.

You can see an example of this deployed at [www.geraldmcalister.com](https://www.geraldmcalister.com). A full tutorial for how to use this repository can be seen on the [Wiki for this project](https://github.com/GEMISIS/personal-website/wiki). Please feel free to file issues against this project if you come across any!

**Note that the email provided in the configuration is an anti-spam email! Do not try to send emails to it.**
