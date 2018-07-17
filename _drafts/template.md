---
layout: post
title: "title"
image: assets/images/x.gif
image_alt: "x"
published: false
---

# Image classification with TensorFlow.js and Fashion MNIST

I'm pretty new to machine learning and artifical intelligence, and I am working my way up to building a GAN TODO:link. In my last post TODO:link I started out by exploring some of the basic TensorFlow operations and using TensorFlow to find a linear regression of a set of points. In this post I'll be using it to classify images in the [Fashion MNIST](https://github.com/zalandoresearch/fashion-mnist) dataset. 

<!--more-->

From the [README](https://github.com/zalandoresearch/fashion-mnist): 
> `Fashion-MNIST` is a dataset of [Zalando](https://www.zalando.com/en/)'s article images—consisting of a training set of 60,000 examples and a test set of 10,000 examples. Each example is a 28x28 grayscale image, associated with a label from 10 classes. It is intended  to serve as a direct drop-in replacement for the original MNIST dataset for benchmarking machine learning algorithms. It shares the same image size and structure of training and testing splits.

It has shoes, shirts, pants and more in several different categories. TODO? 

* I'm going to start out by downloading all of the fashion data. Now I have 4 files in my directory, a set of training data with labels and a set smaller test set. The problem is that they are all in one large binary file. I stick them (ungzipped) into folder called `data`
* I use https://github.com/ApelSYN/mnist_dl to 