cf2014
================

CloudForms 2014 Demo

Running on OpenShift
----------------------------

Create an account at http://openshift.redhat.com/

Create a nodejs-0.10 application based on this repo's code (you can call your application whatever you want)

    rhc app create $appname nodejs-0.10 --from-code=https://github.com/rkmallik/cf2014

Then, create a twitter application so you can get credentials. Feed them, along with your cfme details (url, username, password) into your openshift app with:

    rhc set-env twitter_consumer_key='' twitter_consumer_secret='' twitter_access_token='' twitter_access_token_secret='' rhc set-env cfme_url='' cfme_user='' cfme_pass='' -a $appname
