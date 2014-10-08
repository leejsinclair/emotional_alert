'use strict';
var hardWords = [
	'abuse',
	'anguish',
	'anxiety',
	'anxious',
	'cruel',
	'death',
	'depressed',
	'depression',
	'despair',
	'die',
	'fear',
	'grief',
	'grieving',
	'helpless',
	'hopelessness',
	'kill',
	'panic',
	'sadness',
	'scared',
	'sorrow',
	'stigma',
	'suffer',
	'suicide',
	'terrified',
	'tragedy',
	'tragic',
	'victim',
	'worthless'
];

var softWords = [
	'abnormal',
	'aid',
	'alarm',
	'confusion',
	'confused',
	'debilitating',
	'finality',
	'inability',
	'issues',
	'jeer',
	'joking',
	'jokes',
	'label',
	'lack',
	'need',
	'normal',
	'overcome',
	'parents',
	'peers',
	'prevent',
	'prevention',
	'protect',
	'reality',
	'review',
	'serious',
	'seriousness',
	'strength',
	'symptom',
	'tentative',
	'tired',
	'treatment',
	'unusual',
	'watch',
	'cant',
	'can\'t',
	'must',
	'should'
];

var mediumWords = [
	'alone',
	'anger',
	'alienation',
	'cope',
	'counsel',
	'discriminate',
	'discrimination',
	'endure',
	'esteem',
	'fatigued',
	'fatigue',
	'fight',
	'defeated',
	'defeat',
	'help',
	'hurt',
	'insecure',
	'irritable',
	'isolation',
	'mental',
	'misunderstanding',
	'misunderstand',
	'misunderstood',
	'negative',
	'overwhelmed',
	'pain',
	'separation',
	'seperate',
	'struggle',
	'sympathetic',
	'therapy',
	'troubled',
	'trouble',
	'uncertain',
	'uncomfortable',
	'unfulfilled',
	'unsettling',
	'warning',
	'worry',
	'had enough',
	'fed up',
	'angry',
	'out of control',
	'sad',
	'stressed',
	'any sware words',
	'give up',
	'whats the point',
	'can\'t change',
	'too hard',
	'stupid',
	'idiot',
	'tough',
	'alone',
	'lost',
	'not happy',
	'unhappy'
];
/**
 * Convert array of words into regular expression
 * @param  {String} listId    ID of words list
 * @param  {Array} wordsList Array of words
 * @return {RegEx}           Regular expression used for matching
 */
function convertWordsToRegExp(wordsList) {
	var regStr = '',
		regExpression;
	// Do not use preset
	for (var i = 0; i < wordsList.length; i++) {
		if (typeof(wordsList[i]) === 'string' && wordsList[i].length > 0) {
			regStr += ((i !== 0) ? '|' : '') + wordsList[i];
		}
	}

	regStr = '\\b(' + regStr + ')\\b';


	regExpression = new RegExp(regStr, 'gmi');

	return regExpression;
}

var dangerRe = convertWordsToRegExp(hardWords);
var wordsRe = convertWordsToRegExp(mediumWords);
var indicatorsRe = convertWordsToRegExp(softWords);

function emotionalIndicator(str) {
	var emotionalAlert = false;
	var dangerMatch = str.match(dangerRe);
	var wordMatch = str.match(wordsRe);
	var indicatorsMatch = str.match(indicatorsRe);

	if(dangerMatch && dangerMatch.length>0) {
		emotionalAlert = true;
	}

	if( wordMatch && wordMatch.length>=2 ) {
		emotionalAlert = true;
	}

	if( indicatorsMatch && indicatorsMatch.length>4 ) {
		emotionalAlert = true;
	}

	return emotionalAlert;
}

if (module) {
	module.exports = emotionalIndicator;
}
