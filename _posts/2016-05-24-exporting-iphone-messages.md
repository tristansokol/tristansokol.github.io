---
layout: post
title: Exporting your iPhone messages as a CSV
---
#### Want to export your iOS messages as a CSV so that you can keep them for years to come? 
_This is a step by step DIY tutorial that uses open source software to display your entire message history in your browser._

##### Step 1: Back up your phone to your computer. 
 For you this might be physically plugging your phone in, and opening iTunes. You will need to change some options so that you backup to your computer, and not to iCloud. You also do not want to encrypt your backup, or else you will have pain further down the road trying to decrypt it. In fact your options might have to look something like this: 
![iTunes Options](/assets/iTunes.png)

##### Step 2: Find your message database. 
Your iPhone backups are located at /Users/${USER}/Library/Application\ Support/MobileSync/Backup/ (assuming you use another apple product as your computer) We are interested in two files : `31bb7ba8914766d4ba40d6dfb6113c8b614be442` and `3d0d7e5fb2ce288813306e4d4636395e047a3d28`. One of these is a SQLite database of your iPhone’s text messages and the other is your contacts, which we will need to add people’s names to the records instead of just having their phone numbers. It might be easiest to copy these files to your desktop. 

If you are trusting of random bash scripts you find off the internet, here is a bash script that should make this process easier:
```
curl -s https://raw.githubusercontent.com/tristansokol/iphone-message-csv-export/master/export.sh | bash
```
Feel free to inspect beforehand if you want. [https://raw.githubusercontent.com/tristansokol/iphone-message-csv-export/master/export.sh](https://raw.githubusercontent.com/tristansokol/iphone-message-csv-export/master/export.sh)
##### Step 3: Export the files
From the last step you should have two files that are actually SQLite databases, now you just need to mount them, merge the tables, and export. I made a page that will allow you to drag your two files into your browser, you can try it out here: [http://tristansokol.github.io/iphone-message-csv-export/](http://tristansokol.github.io/iphone-message-csv-export/)

It might take up to 60+ seconds to see anything happen after you drag the files in, depending on your computer and how many messages you have. I had about 135,000 messages and a modern MacBook Pro and it takes about fifteen seconds. 

##### Step 4: Copy to excel
After step three you should have a browser window with a list of all of your text messages organized by partner. You can scroll to the person you'd like to find, and then copy and paste that person's messages, or every message into a file to save. 
The four colums are 
* Timestamp (depending on which timezone you were in, which timezone your phone thought you were in, etc., this might be off by a couple hours
* Is_from_me If 1, then you send the message, if 0, you received it. 
* Partner, The other person you were texting
* Message The text of the message

If you have any trouble, issues, concerns (really any at all), please submit a [new issue](https://github.com/tristansokol/iphone-message-csv-export/issues)

(Much of the heavy SQL lift was done by [SQL.js](http://tristansokol.github.io/iphone-message-csv-export/), a great javascript SQLite engine. 

If you are interested in building data analysis and visualization on top of this data aka [Textual](http://get-textual.com), please let me know! 
