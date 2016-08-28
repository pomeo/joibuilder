Joibuilder
============
[![Build Status](https://api.travis-ci.org/pomeo/joibuilder.png)](http://travis-ci.org/pomeo/joibuilder)
[![Dependencies](https://david-dm.org/pomeo/joibuilder.png)](https://david-dm.org/pomeo/joibuilder)
[![NPM version](https://badge.fury.io/js/joibuilder.svg)](http://badge.fury.io/js/joibuilder)

Node.js module to parse a yaml input file into a joi schema

## Installation

```
npm install joibuilder --save
```

## Usage

```js
// Import a module
import joibuilder from 'joibuilder';

// Get things done
const fromYamlSchema = joibuilder.build('test/file.yml');
// or can transmit object
import yamlParser from 'yamljs';
const json = yamlParser.load('test/file.yml').columns;
const fromYamlSchema = joibuilder.build(json);
```
