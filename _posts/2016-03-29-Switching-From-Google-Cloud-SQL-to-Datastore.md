---
published: false
---

---
layout: post
title: Switching from Google Cloud SQL to Datastore 
---

I have many projects that barely see the light of day, both in terms of implementation and use. While I don't loose sleep about building tons of single page web apps that don't get used, I do care about how much they cost me. 

I made the switch to Google Cloud Platform for hosting a couple years ago primarily for the cost-savings and better developer experience. When you have a side project with only a few hundred page views a month, there is not reason to be paying for more than you need. Google's App Engine does a great job of offering on-demand pricing as well as a very generous free tier, storage is a little more difficult however. When I migrated [AcaNation](acanation.com "AcaNation - find a cappella music") I opted to make the easy transistion to Google's managed SQL environment since all of my data was in a SQL environment anyway. 
