Emotional alert -- Node.js
==========================

A simple app that make assumptions about the text that people write. It idenitifes emotionally charged words and returns a true/false flag that represents if the text written is emotionally concerning.

Installation
-----------

    npm install emotional_alert --save

Usage
-----

    var emotionalAlert = require('emotional_alert');
    var isEmotional = emotionalAlert('who am i?');
