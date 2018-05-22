---
layout: post
title: "DIY Automatic Curtains with Particle Photon"
image: assets/images/curtains.gif
image_alt: "An animation of curtains rising, greeting the day"
published: false
---

I have never been much of a morning person, but nothing wakes me up better than the sun in all its bleary-eyed glory. the hard part is convincing someone to come into my room in the morning to open up my curtains. Luckily, a robot can do that for me.

<!--more-->

This project took a few iterations, and is still a work in progress, but we are definitely at a good point in its development to share what is going on.

Initially I wanted something that could open my curtains. the basic premise was to attach the curtains to a length of pipe and then use a motor to roll the curtains up at the appropriate time.

### Parts:
![motor](/assets/images/motor.png "illustration of a motor"){:width="300px"}

* **motor**: torque was an issue in the past, so I used a motor with a worm gear drive attached. You should be able to find a similar one with [this ebay search](https://www.ebay.com/sch/i.html?_nkw=12v+worm+gear+motor&_sop=12).

![pipe](/assets/images/pipe.png "illustration of a pipe"){:width="300px"}

* **pvc pipe**: I went for the cheapest, smallest pipe I could find that was longer than my windows, 3/4" pvc is what Home Depot had.

* **h bridge**:an h bridge is really handy in letting you control large amounts of current/voltage from a much smaller input signal. it would be impossible to drive my X watt motor from the x watt photon, so an h bridge connected directly to my power supply does the _heavy lifting_ for me.  
* **power supply**: i had this lying around from some old printer, etc.
* **mounting screws**: one of the many things you give up when buying parts from the oh so affordable depths of ebay is that you doent really get a datasheet about anything. 
* **blackout curtain**
* **bracket**: I spent some time wandering the eisles of home depot trying to find something that was a right angle, i coukd drill through pretty easily, and large enough to fit the mounting screws on my motor. 
* **particle photon**:

### hardware build
in My previous attempts with this project, the crux was attaching the motor to the curtains, and the wall, so i 

 that first. after some very approximate measurement i drilled holes into my bracket to mostly fit the mounting screws for my motor. 

to connect the motor shaft to the curtain pole, we used a pvc endcap with a hole drilled in it and another mounting screw for the motor shaft. 


### code

the code for the photon is pretty simple, and should be easily ported to other platforms. the main action happens in an infinite loop that checks the time. if it is seven am and the curtains are down, it raises them. if it is 7pm and the curtains are up, it lowers them. occasinally it syncs up the time with particle cloud. 



