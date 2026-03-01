# Enumerating Rectangles With Empty Interior

## Problem Statement
Consider the following algorithmic problem.  Given a binary matrix M, enumerate all subrectangles within M such that border entries are 1's and interior entries are 0's.  We call this problem *Enumerating Rectangles With Empty Interior*.

## Algorithm
Suppose that the matrix M has m rows and n columns.  An algorithm that solves this problem in O(m*n) time using at most O(n) space is presented in the following work: *A. Abdelmonsef, X. Dong, D. Průša, M. Wehar, and C. Xu. Finding Maximum and Minimum Size Matrices: The Algorithmic Complexity of Coding Challenges. FUN 2026 (To Appear).*

Here we provide an implementation of the algorithm presented in this upcoming paper.
In addition, we apply the algorithm to an example use case where we find and color all white rectangles within a given image.

## The Code
`algorithm.js`: Contains the algorithm implementation.

`test.js`: Tests the string and matrix functions used in the algorithm implementation.

`color_image.js`: Contains the example use case that finds and colors all white rectangles within the "1.png" file.

## Run Code
First, you will need to `npm install canvas`.
Then, you can type `node test.js` and `node color_image.js` to run the code.

## Related Works
This algorithm was used within the [Composition](https://michaelwehar.wordpress.com/2024/10/28/algoart-13-composition/) drawing algorithm from the [AlgoArt Platform](https://algoart.org).  Examples of the generated images can be viewed within [AlgoArt's Gallery](https://algoart.org/gallery.html?algid=alg11).

## Credits
Coded by Xingyu Dong and Michael Wehar.
Released under MIT License.
