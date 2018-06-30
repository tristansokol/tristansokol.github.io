---
layout: post
title: "title"
image: assets/images/x.gif
image_alt: "x"
published: false
---

Fresh off of the [OpenAI Retro contest](https://blog.openai.com/first-retro-contest-retrospective/), I wanted to keep explorig more AI topics. Somebody told me that the best way to learn was reproducing other people's papers. Not wanting to learn any more Python than I had to, I decided to try to tackle some existing work with [TensorFlow.js](https://js.tensorflow.org/).

I first tried to run, but I realized it might be better to crawl first since I am coming from a pretty fresh background. I was able to find a series of basic TensorFlow examples that I felt would let me ladder up my TensorFlow.js skills in [aymericdamien/TensorFlow-Examples](https://github.com/aymericdamien/TensorFlow-Examples)TODO link to past blog posts?



## Hello World
I'm not sure what the right Hello World with TensorFlow would be, so I printed out my first 1 dimensional Tensor:

```javascript
const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

tf.scalar(3.14).print();
```
and hey, looks like floating point percision problems exist in the TensorFlow world too!
```
Tensor
    3.140000104904175
```

## Basic Operations

Getting a handle on the basic operations seems important! On of the biggest surprises here was that methods to display the values inside of a Tensor seem somewhat limited. `tf.print()` and `tf.toString()` both add the word `Tensor` with a newline to the text, making it a bit hard to easily display values.

```javascript
let a = tf.scalar(2);
let b = tf.scalar(3);

console.log('a: '+a.dataSync()[0]+', b: '+b.dataSync()[0]);
console.log('Addition with constants:'+ a.add(b).dataSync()[0]);
console.log('Multiplication with constants:'+ a.mul(b).dataSync()[0]);
```
```
a: 2, b: 3
Addition with constants:5
Multiplication with constants:6
```
## Basic Operations with a model

TODO

## Matrix Mulitplication

Compared to the last one, this one was way easier.

```javascript
let a = tf.tensor2d([[3, 3]]);
let b = tf.tensor2d([[2], [2]]);

a.matMul(b).print();
```
```
Tensor
     [[12],]
```

## Linear Regression

Now it's time to start making model that can actually do things. One of the simplest problems to solve is finding the values for a linear regression. If you recall from algebra, lines generally can be modeled with `y = mx + b`, and TensorFlow can do the hard work of finding out what `m` & `b` are.

We'll start with our training data and intializing variables that will hold our results. 

```javascript
const trainX = [3.3, 4.4, 5.5, 6.71, 6.93, 4.168, 9.779, 6.182, 7.59, 2.167, 7.042, 10.791, 5.313, 7.997, 5.654, 9.27, 3.1];
const trainY = [1.7, 2.76, 2.09, 3.19, 1.694, 1.573, 3.366, 2.596, 2.53, 1.221, 2.827, 3.465, 1.65, 2.904, 2.42, 2.94, 1.3];

const m = tf.variable(tf.scalar(Math.random()));
const b = tf.variable(tf.scalar(Math.random()));
```

Right now we can visualize our data, but because we essentially have random numbers for our line, we don't have a very good fit. 

<p data-height="265" data-theme-id="light" data-slug-hash="LrrwMm" data-default-tab="js,result" data-user="tristansokol" data-embed-version="2" data-pen-title="Linear Regression: no training" class="codepen">See the Pen <a href="https://codepen.io/tristansokol/pen/LrrwMm/">Linear Regression: no training</a> by Tristan Sokol (<a href="https://codepen.io/tristansokol">@tristansokol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Even though we know that we don't have a good model, we can use it to predict the Y values of the points. We'll create a new function to efficiently run the model: 
```javascript
function predict(x) {
  return tf.tidy(() => {
    return m.mul(x).add(b);
  });
}
```

As you would expect, all of the points are on the line that describes the slope (`m`) and y-offset (`b`), since the model is just applying those varibles to the input. The [`tf.tidy()`](https://js.tensorflow.org/api/0.11.7/#tidy) helps out with cleaning up intermediate tensors. It doesn't seem like a big deal for this very small example, but very probably a big source of  TODO, make this better

<p data-height="265" data-theme-id="light" data-slug-hash="VdBLeg" data-default-tab="result" data-user="tristansokol" data-embed-version="2" data-pen-title="VdBLeg" class="codepen">See the Pen <a href="https://codepen.io/tristansokol/pen/VdBLeg/">VdBLeg</a> by Tristan Sokol (<a href="https://codepen.io/tristansokol">@tristansokol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Let's see if we can actually get a good fit. We are still missing a couple  piece of the puzzle to do that though. One is the loss function. The loss function will be what our model uses to determine how well the model is performing. I think it could just as easily be described in the positive and be called a fit or _goodness_ function but loss works too. 




TODO, see full gist of code here: