const bayes = require('classificator');
const classifier = bayes();
const fs = require('fs');

const inpath = `${__dirname}/bayes_classified_2.csv`;
const outpath = `${__dirname}/bayes_classified.json`;
const lines = fs.readFileSync(inpath, { encoding: 'utf8' }).split('\n');

const lookup = {
    happiness: 'joy',
    love: 'joy',
    enthusiasm: 'joy',
    joy: 'joy',
    fun: 'joy',
    empty: 'neutral',
    boredom: 'neutral',
    worry: 'sadness',
    hate: 'anger',
    worry: 'worry',
    fear: 'fear',
    sadness: 'sadness',
    neutral: 'neutral',
    surprise: 'surprise',
    relief: 'relief',
    anger: 'anger'
};

lines.forEach((line) => {
    const [str, emotion] = line.split('\t');
    if (emotion && str) {
        if (!lookup[emotion]) {
            console.log(emotion);
        } else {
            classifier.learn(str.toLowerCase(), emotion)
        }
    }
});

const result = classifier.categorize("what did you do on the happy weekend");
console.log(result);

const data = classifier.toJson();
fs.writeFileSync(outpath, data, { encoding: 'utf8' });