---
published: false
layout: post
title: Switching from Google Cloud SQL to Datastore 
---

I have many projects that barely see the light of day, both in terms of implementation and use. While I don't loose sleep about building tons of single page web apps that don't get used, I do care about how much they cost me. 

I made the switch to Google Cloud Platform for hosting a couple years ago primarily for the cost-savings and better developer experience. When you have a side project with only a few hundred page views a month, there is not reason to be paying for more than you need. Google's App Engine does a great job of offering on-demand pricing as well as a very generous free tier, storage is a little more difficult however. When I migrated [AcaNation](acanation.com "AcaNation - find a cappella music") I opted to make the easy transistion to Google's managed SQL environment since all of my data was in a SQL environment anyway. One of the unforetunate side-effects is that everytime that website-optimization-startup-that-I-can't-opt-out-of runs, it costs me somewhere around ten dollars in fees. This and the normal usage of the site are fees that I am tired of eating. 

Google Datastore's prices are currently: 

|   | FREE LIMIT PER DAY  | PRICE ABOVE FREE LIMIT  |
| --- | --- | --- |
| Stored data | 1 GB storage | $0.18 / GB / month |
| Read Operations | 50k operations  | $0.06/100k operations |
| Write Operations  | 50k operations | $0.06/100k operations |

AcaNation has a little over 250 megabytes of text data, who cares how many operations since its so cheap. This is definitely going to help my side project bottom line. 


#### 1. Install phpMyAdmin

To be honest, I haven't done much work on AcaNation since getting rid of my web hosting. I vaguely remember how some of the tables are set up, but I would hate to do lots of hard work to explore it with SQL commands. Luckily those friendly googlers wrote [this tutorial to setup phpMyAdmin on AppEngine](https://cloud.google.com/sql/docs/phpmyadmin-on-app-engine).

This project halted due too complete apathy for acanation. 
