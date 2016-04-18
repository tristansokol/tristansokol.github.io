# Link Tracking for Everyone! 

I've been including links in my email signature for a little over 4 years now. These links are usually to my personal website, or various side projects i've created and wanted to share. Occasionally I'll hear from someone that they checked out one of these links, but otherwise I get very little feedback if anyone is checking out these links. **Until now!**

Link tracking is not a new concept, there are a gazillion different email marketing tools that have such features, but I didn't find one that was as lightweight and had as seamless of an experience as I wanted. (I also wanted a project to learn more about [Google's Cloud Datastore](https://cloud.google.com/datastore/docs/concepts/overview) and don't plan on rewriting [AcaNation](http://acanation.com/) anytime soon.) 

Ideally I wanted an experience that would live inside of gmail, giving me the option to send all of my email with trackable links. The links in these emails will be parsed out before sending and replaced with a different url that will notify me when clicked. These notifications might as well be replys in the same thread, similar to automatic build comments in GitHub. The simplist way that came to me as I was writing this to have this effect was the following

| Order of Events  | 
| ------------- | 
| Draft an email to someone |
| Apply a special label  |
| Cron job polls the label|
| Replaces links, sends|
| Updates the thread as