# Count words occurrence

[![npm version](https://badge.fury.io/js/count-words-occurrence.svg)](https://badge.fury.io/js/count-words-occurrence) [![Build Status](https://travis-ci.org/samouss/count-words-occurrence.svg?branch=master)](https://travis-ci.org/samouss/count-words-occurrence)

## Installation

```
npm install --save count-words-occurrence
```

## Usage

Import the module in your application:

```js
// From ES6
import countWords from 'count-words-occurrence'

// From CJS
const countWords = require('count-words-occurrence');

// From global
const countWords = countWordsOccurrence.default;

// Then use it juste like that:
const result = countWords(input, options);
```

## Documentation

```js
countWords(input, options);
```

#### **input**

Type: `string`

#### **options.caseSensitive**

Type: `boolean` | default: `false`

#### **options.minLength**

Type: `number` | default: `2`

The minimum length of words to count.

#### **options.predicates**

Type: `Array<(x: string) => boolean>` | default: `[]`

An array of functions to apply to each word for enable custom filters.

## Run the test

```
npm test
```
