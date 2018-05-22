---
layout: post
title: Qualities of a Great API SDK or Library
published: false 
---

APIs are great, but using them is someitimes a chore. That is why API publishers release SDKs and software libraries to help developers move more quickly in their preferredl angulage. Offering up these developerment tools in every langulage would be great, but constraints like lack of expertise, or just not having enough people to upkeep can prevent a first party API library, luckly the open source community can fill in the gaps. Unluckily everybody wants to roll their own thin REST wrapper for their language and it can be hard to pick out your favorite one. 

whatever, picking out an open source library to support or contribute to: 
* Recentcy: APIs aren't static entities, they are constantly being updated and the libraries for them will likely need to be updated as well. 

* Completeness: How far along is the library in API coverage? Can it handle all of the authentication and all of the API's endpoints? What about advanced functionality like batching requests or optimized payloads?

* first time user experience. This is an incredibly important aspect of any peice of code that many people neglect when creating something for the open source community. People who might be looking at this library, can probably be assumed to have used the language before (So you don't need 'how to download and install python' for example) but they likely haven't used the API before. There should be instructions on how to create a developer account, get the proper credentials for an application

* documentation, hopefully the API has lots of symmetry and the library can reflect that. all of the function calls, and objects should be broken out and explained


* Design: a good library should have sensible objects for interacting with the base api, that aren't burdensome. 
