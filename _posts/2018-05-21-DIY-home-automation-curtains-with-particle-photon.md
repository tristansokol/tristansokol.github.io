---
layout: post
title: "DIY Automatic Curtains with Particle Photon"
image: assets/images/curtains.gif
image_alt: "An animation of curtains rising, greeting the day"
published: false
---

I have never been much of a morning person, but nothing wakes me up better than the sun blaring its rays onto my face. The hard part is convincing someone to come into my room each morning to open up my curtains. Luckily, with some DIY IoT a robot can do that for me.

<!--more-->

Initially I wanted something that could open my curtains in the morning with the possibility of enhancements in the future. The basic premise is to attach the curtains to something long and round and then use a motor + IoT device to roll the curtains up at the appropriate time.

This project took a few iterations, and is still a work in progress, but we are at a good point in its development to share what is going on.

### Parts:

#### Hardware

![motor](/assets/images/motor.png "illustration of a motor"){:width="300px"}

* **motor**: My biggest concern was torque so I used a motor with a worm gear drive attached. You should be able to find a similar one with [this ebay search](https://www.ebay.com/sch/i.html?_nkw=12v+worm+gear+motor&_sop=12).

![pipe](/assets/images/pipe.png "illustration of a pipe"){:width="300px"}

* **pvc pipe**: I went for the cheapest, smallest pipe I could find that was longer than my windows, 3/4" pvc is what my Home Depot had.

* **bracket**: I spent some time wandering the aisles of home depot trying to find something that was a right angle, I could drill through pretty easily, and large enough to fit the mounting screws on my motor. What I ended up with was a smaller shelf style bracket. 

* **mounting screws**: One of the many things you give up when buying parts from the oh so affordable depths of ebay is that you doent really get a datasheet about anything. I brought my motor into home depot until I found that M5 screws fit perfectly.

* **blackout curtain**: Ideally you should already have this, but any opaque flexible sheet bigger than your window should work.

#### Electronics

* **Particle Photon**: The Photon has been a go-to of mine for projects involving connected devices for a few years now (and I always seem to have one lying around). 

* **h bridge**:an h bridge is really handy in letting you control large amounts of current/voltage from a much smaller input signal. It would be impossible to drive my X watt motor from the x watt photon, so an h bridge connected directly to my power supply does the _heavy lifting_ for me. I am using a [L298N breakout board](https://www.ebay.ca/sch/i.html?_odkw=l298+motor+driver&_osacat=0&_from=R40&_trksid=m570.l1313&_nkw=l298+h+bridge&_sacat=0) . 

* **power supply**: This was left over from a recycled print (or something), mine is rated for X amps at X Volts. 

* **Electronic bits and pieces**: voltage regulator, wires, TK other stuff?

### Build

TODO - Animation of motor & bracket coming together

in My previous attempts with this project, the crux was attaching the motor to the curtains, and the wall, so I tackled that first. after some very approximate measurement I drilled holes into my bracket to mostly fit the mounting screws for my motor.

TODO - Animation of endcap, motor, screw & pipe coming together

To connect the motor shaft to the curtain pole, we used a pvc endcap with a hole drilled in it and another mounting screw for the motor shaft. 

### Electronics

TODO - Schematic of photon & h-bridge with dotted lines to components. 

The electronics are fairly simple & straightforward. The power supply offers up 9V which is pumped directly into the motor and the 5v regulator. The 5v feeds into the Photon (and the hbridge?) and two of the GPIO pins from the photon contron the inputs for the motor via the h-bridge. 

### Software

```javascript
int t = 75000;
// t, the amount of time required to raise or lower the blinds. 

int pos = D0; 
int neg = D1;
// pos & neg correspond to the output pins connected to the two motor leads. 
bool isCurtainDown = false;

void raise(){
    digitalWrite(pos, HIGH);
    digitalWrite(neg, LOW);
    delay(t);
    digitalWrite(pos, LOW);
    digitalWrite(neg, LOW);
}
void lower(){
    digitalWrite(pos, LOW);
    digitalWrite(neg, HIGH);
    delay(t);
    digitalWrite(pos, LOW);
    digitalWrite(neg, LOW);
}

void setup() {
    pinMode(pos, OUTPUT);
    pinMode(neg, OUTPUT);
    // set the first two GPIO pins as outputs.

    Time.zone(-7);
    //Sync the timezone to USA west coast

    RGB.control(true);
    RGB.color(0, 0, 0);
    //turn off the LED on the Photon

    raise();
}

void loop() {
    if(Time.hour() == 19 && !isCurtainDown ){
      lower();
      isCurtainDown = true;
    }
    if(Time.hour() == 7 && isCurtainDown ){
      raise();  
      isCurtainDown = false;
      Particle.syncTime();
    }
}
```

The code for the photon is pretty simple, and should be easily ported to other platforms (really anything that can keep time / has a timer should be able to handle this project).

In the setup function we set up our GPIO pins to outputs, set our local UTC offset and take control of the RGB LED on the photon. I try to make my room as dark as possible at night, so I turn off the LED at all times, but we could instead use it to convey some useful information, or even [help you sleep](https://www.google.com/search?q=pulsing+light+to+help+you+sleep).

 The main action happens in an infinite loop that checks the time, if it is seven am and the curtains are down, it raises them. if it is 7pm and the curtains are up, it lowers them. In the evening it syncs the time with Particle Cloud, to offset any time drift as [recommended in the Particle docs](https://docs.particle.io/reference/firmware/photon/#particle-synctime-).