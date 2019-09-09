const fs = require('fs');
const words = require('../../data/emotion');
const removeDoubleNeg = require('../double-neg');
const convertWordsToRegExp = require('../converToRegEx');
const bayes = require('classificator');

const wordsRe = convertWordsToRegExp(words.words);
const bayesClassification = fs.readFileSync(`${__dirname}/../../data/bayes_classified.json`);
let classifier = bayes.fromJson(JSON.parse(bayesClassification));

module.exports = (str) => {
    const cleanStr = removeDoubleNeg(str);

    var wordMatch = cleanStr.match(wordsRe) || [];

    const emotions = wordMatch.map((w) => words.lookup[w]);
    const total = emotions.reduce((acc, e) => { return acc + words.weighting[e] }, 0);

    const bayesResult = classifier.categorize(cleanStr);

    // wordMatch.forEach((w) => {
    //     console.log(w, words.lookup[w]);
    // });

    var wordSplit = str.split(/\W+/);
    var wordsLen = wordSplit ? wordSplit.length : 1;

    const score = emotions.length > 0 ? (total / emotions.length) / wordsLen : 0;
    const category = bayesResult.likelihoods.filter((l) => l.category === bayesResult.predictedCategory)[0];

    return { emotions, score, matches: wordMatch, bayes: { prediction: bayesResult.predictedCategory, proba: category.proba } };
};