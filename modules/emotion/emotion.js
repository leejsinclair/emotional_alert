const words = require('../../data/emotion');
const removeDoubleNeg = require('../../modules/double-neg');
const convertWordsToRegExp = require('../../modules/converToRegEx');

const wordsRe = convertWordsToRegExp(words.words);

const str = 'i don\'t love you and you\'re so ugly';
const cleanStr = removeDoubleNeg(str);

console.log(cleanStr);
var wordMatch = cleanStr.match(wordsRe) || [];

const emotions = wordMatch.map((w) => words.lookup[w]);
const total = emotions.reduce((acc, e) => { console.log(e); return acc + words.weighting[e] }, 0);

wordMatch.forEach((w) => {
    console.log(w, words.lookup[w]);
});

console.log(emotions, total);