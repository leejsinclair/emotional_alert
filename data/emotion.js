const data = require('./data.js');
const words = data.map((d)=> d.word);
let opposites = {'joy': 'sadness', 'sadness': 'joy', 'anger': 'friendly', 'anger': 'joy', 'disgust': 'delight', 'fear':'courage', 'surprise':'calm'};
let lookup = {};
let nots = {};
data.forEach((d)=>{ lookup[d.word] = d.emotion; });
data.forEach((d)=>{ lookup[`not ${d.word}`] = opposites[d.emotion] });
data.forEach((d)=>{ lookup[`no ${d.word}`] = opposites[d.emotion] });
console.log(lookup);
