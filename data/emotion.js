const data = require('./emotion/en');

let words = data.map((d) => d.word);
let opposites = { 'joy': 'sadness', 'sadness': 'joy', 'anger': 'friendly', 'anger': 'joy', 'disgust': 'delight', 'fear': 'courage', 'surprise': 'calm', 'depression': 'calm' };
let lookup = {};
data.forEach((d) => { lookup[d.word] = d.emotion; });
data.forEach((d) => { lookup[`not ${d.word}`] = opposites[d.emotion]; words.push(`not ${d.word}`); });
data.forEach((d) => { lookup[`stop ${d.word}`] = opposites[d.emotion]; words.push(`stop ${d.word}`); });
data.forEach((d) => { lookup[`no ${d.word}`] = opposites[d.emotion]; words.push(`no ${d.word}`); });
data.forEach((d) => { lookup[`don't ${d.word}`] = opposites[d.emotion]; words.push(`don't ${d.word}`); });
data.forEach((d) => { lookup[`don't be ${d.word}`] = opposites[d.emotion]; words.push(`don't be ${d.word}`); });

weighting = {
    joy: 3,
    worry: -1,
    sadness: -3,
    anger: -3,
    friendly: 1,
    delight: 2,
    disgust: -2,
    fear: -3,
    courage: 2,
    surprise: 0,
    calm: 1,
    depression: -6,
    danger: -9,
    relief: 1,
    neutral: 0
};

module.exports = {
    words,
    lookup,
    weighting,
};
