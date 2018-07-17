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


## Part 1: Data Wrangling. 

Fashion MNIST is meant to be a drop-in replacement for the original MNIST dataset, but the original MNIST dataset is really hard to use with JavaScript. The first thing I am going to do is try to convert it into something a little easier to work with.

* I'm going to start out by downloading all of the fashion data from [zalandoresearch/fashion-mnist](https://github.com/zalandoresearch/fashion-mnist/tree/master/data/fashion). Now I have 4 files in my directory, a set of training data with labels and a set smaller test set. The problem is that they are all in one large binary file. I stick them (ungzipped) into folder called `data`
* There are a couple js based tools to help you use the original MNIST data set, namely [cazala/mnist](https://github.com/cazala/mnist) and [ApelSYN/mnist_dl](https://github.com/ApelSYN/mnist_dl) unfortunately they aren't really very useful when it comes to trying to use them for a different data set. You can drop in the source files for the training data, but there needs to be some custom work to utilize the test set. Luckily everything is on GitHub can use their existing code to make what I need. Ultimately I got the training and test files into their own json files organized by label. You can see all of the code for it in my [fashion-mnist-to-array.js gist](https://gist.github.com/tristansokol/aa4373d2f2b5ae31fbb04235b5663107).
* In order to check my work (and see if all my array slice and dicing worked correctly) I tried displaying some of the images. It wasn't easy trying to find a library that could turn an array of raw pixel values into something visible, but [pngjs](https://github.com/lukeapage/pngjs) did the trick. This function can turn a flat array of normalize grayscale image data into a png image.

```javascript
function write2PNG(arr, filename) {
    let max = Math.max.apply(null, [].concat(...arr));
    if (max <= 1) {
        arr = arr.map(function(element) {
            // denormalize if needed
            return Math.round(element * 255);
        });
    }
    if (arr.length == 784) {
        // resize 1x784 to 28x28
        let tmp = [];
        for (let i = 0; i < 28; i++) {
            tmp.push(arr.slice(i * 28, (i + 1) * 28));
        }
        arr = tmp;
    }

    let newfile = new PNG({
        width: arr[0].length,
        height: arr.length,
        colorType: PNG.COLORTYPE_GRAYSCALE,
    });

    for (let i = 0; i < newfile.height; i++) {
        for (let j = 0; j < newfile.width; j++) {
            let idx = (newfile.width * i + j) << 2;
            newfile.data[idx] = arr[i][j];
            newfile.data[idx + 1] = arr[i][j];
            newfile.data[idx + 2] = arr[i][j];
            newfile.data[idx + 3] = 0xff;
        }
    }
    newfile.pack()
        .pipe(fs.createWriteStream(__dirname + '/' + filename + '.png'))
        .on('finish', function() {
            console.log('wrote ' + filename + '.png');
        });
}
```

![alt text](assets/images/shirts.png "Logo Title Text 1")

## Part 2: The Model
Since this is a learning experience, TODO, we will be using a fairly standard model for classification problems, a convulituonal image classifier. The fundamentals of this model is the two dimensional convolutional layer that scans a window of pixels
https://stackoverflow.com/questions/34619177/what-does-tf-nn-conv2d-do-in-tensorflow