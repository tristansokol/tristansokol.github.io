---
layout: post
title: "title"
image: assets/images/x.gif
image_alt: "x"
published: false
---


Fresh off of winning TODO from the OpenAI retro contest, I wanted to keep explorig more AI topics. Somebody told me that the best way to learn was reproducing other people's papers. Not wanting to learn any more Python than I had to, I decided to try to tackle some existing work with [TensorFlow.js](https://js.tensorflow.org/).

GANs or [Generative Adversarial Networks](https://en.wikipedia.org/wiki/Generative_adversarial_network) have always interested me, mainly from the examples I had seen of interesting generated things like [Magic cards](https://alaurans.com/lets-create-magic-cards-with-a-dcgan/) to [stock images](https://blog.openai.com/generative-models/) so I decided to try to reproduce the simplest GAN tutorial I could find with TensorFlow.js

<!--more-->

In [An introduction to Generative Adversarial Networks](http://blog.aylien.com/introduction-generative-adversarial-networks-code-tensorflow/) Jonh Glover walks through some of the theory behind GANs and then implements a basic example of generating a 1 dimensional distribution based on [work by Eric Jang](https://blog.evjang.com/2016/06/generative-adversarial-nets-in.html). Since I'm an engineer and not a physicist, I am going to start with the implementation and then use that to pragmatically learn the theory.

The first step is to be able to generate a 1D distribution. John used what appears to be basic NumPy wizardry, and I am mentally sweating,  already starting to feel the burn of trying to redo this in a new language. Luckily, I have all of JavaScript's world of packages at my disposal, and a quick google search led me to the [gaussian](https://www.npmjs.com/package/gaussian) package. After that, getting the values wasn't too hard.

```javascript
function dataDistribution(N) {
    let mean = 4;
    let variance = 0.5;
    let distribution = gaussian(mean, variance);
    let i = 0;
    let samples = [];
    while (i < N) {
        samples.push(distribution.ppf(Math.random()));
        i++;
    }
    samples.sort();
    return samples;
}
```

Now I can easily generate as many values as I want along a distribution that looks like this:

<p data-height="265" data-theme-id="light" data-slug-hash="Qxrbrr" data-default-tab="result" data-user="tristansokol" data-embed-version="2" data-pen-title="Gaussian Distribution" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/tristansokol/pen/Qxrbrr/">Gaussian Distribution</a> by Tristan Sokol (<a href="https://codepen.io/tristansokol">@tristansokol</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

The next bit of code I need is "generator input noise distribution". I'm guessing that the input you have for your generator is very important to the end result, since it needs its own generator function.

```javascript
function generatorDistribution(range, N) {
    let stepSize = (range * 2) / (N - 1);
    let samples = [-range];
    while (samples.length < N) {
        samples.push(samples[samples.length - 1] + stepSize);
    }
    samples = samples.map(function(v, i, a) {
        return v * 0.01;
    });
    return samples;
}
```

Now I can start using TensorFlow! 

TODO: come back to this when you know more tensorflow. 
index.js
```javascript
const gaussian = require('gaussian');
const tf = require('@tensorflow/tfjs');

/**
 * Returns a sorted list of samples with mean 4 and σ 0.5.
 *
 * @param {int} N number of samples to return
 * @return {array} samples
 */
function dataDistribution(N) {
    let mean = 4;
    let variance = 0.5;
    let distribution = gaussian(mean, variance);
    let i = 0;
    let samples = [];
    while (i < N) {
        samples.push(distribution.ppf(Math.random()));
        i++;
    }
    samples.sort();
    return samples;
}

/**
 *
 *
 * @param {*} range
 * @param {*} N
 * @return {*}
 */
function generatorDistribution(range, N) {
    let stepSize = (range * 2) / (N - 1);
    let samples = [-range];
    while (samples.length < N) {
        samples.push(samples[samples.length - 1] + stepSize);
    }
    samples = samples.map(function(v, i, a) {
        return v * 0.01;
    });
    return samples;
}

function linear(input, output_dim, scope=None, stddev=1.0) {
    // with tf.variable_scope(scope or 'linear'):
    //     w = tf.get_variable(
    //         'w',
    //         [input.get_shape()[1], output_dim],
    //         initializer=tf.random_normal_initializer(stddev=stddev)
    //     )
    //     b = tf.get_variable(
    //         'b',
    //         [output_dim],
    //         initializer=tf.constant_initializer(0.0)
    //     )
    //     return tf.matmul(input, w) + b
    tf.variable(tf.initializers.randomNormal());
}

/**
 *
 *
 * @param {*} input
 * @param {*} hiddenSize
 * @return {o}
 */
function generator(input, hiddenSize) {
    let h0 = tf.nn.softplus(linear(input, hidden_size, 'g0'));
    h1 = linear(h0, 1, 'g1');
    return h1;
}

// console.log(dataDistribution(10));
// console.log(generatorDistribution(10, 5));
// console.log(generator(34, 1));
```
