# Link Tracking for Everyone! 

I've been including links in my email signature for a little over 4 years now. These links are usually to my personal website, or various side projects i've created and wanted to share. Occasionally I'll hear from someone that they checked out one of these links, but otherwise I get very little feedback if anyone is checking out these links. **Until now!**

Link tracking is not a new concept, there are a gazillion different email marketing tools that have such features, but I didn't find one that was as lightweight and had as seamless of an experience as I wanted. (I also wanted a project to learn more about [Google's Cloud Datastore](https://cloud.google.com/datastore/docs/concepts/overview) and don't plan on rewriting [AcaNation](http://acanation.com/) anytime soon.) 

Ideally I wanted an experience that would live inside of gmail, giving me the option to send all of my email with trackable links. The links in these emails will be parsed out before sending and replaced with a different url that will notify me when clicked. These notifications might as well be replys in the same thread, similar to automatic build comments in GitHub. The simplist way that came to me as I was writing this to have this effect was the following


1. Draft an email to someone 
2. Apply a special label  
3. Cron job polls the label
4. Replace links in a message, sends
5. Updates the thread as links are clicked
6. *and* direct links to their original destination

1 and 2 will be done in the mail client, and number 3 looks pretty easy to tackle. First I created a new label in my inbox called "Replace Links & Send"  Using the PHP client library for Google's API's (and espeically [this sample code](https://developers.google.com/gmail/api/quickstart/php#step_2_install_the_google_client_library) I query for my unsent messages that have that label applied to them 
```
$service->users_messages->listUsersMessages($user,array('q'=>'label:draft label:Replace-Links---Send '));
```

pull out the message parts

```
$service->users_messages->get($user,$message->id)->payload->parts
```

and for the one with a mime type of "text/html" I use a simple regex to pull out all of the links
```
$regex = '/https?\:\/\/[^\" ]+/i';
```
Originally I had planned to create my own copy of a [bit.ly](https://bitly.com/) based on a GCP tutorial I watched one time, but one of my biggest concerns was the long term viability of the links I would create. It would be pretty silly to have all the links in my emails break at some point in the future when a domain name expires or my app engine code goes bad. Fortunately Google can come here as well with the [URL shortner API](https://developers.google.com/url-shortener/v1/getting_started#intro) Now I can replace the links in my messages with goo.gl short links that I hopefully can trust to be around as long as I am using Gmail. 