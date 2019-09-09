'use strict';
const convertWordsToRegExp = require('./modules/converToRegEx');
const emotion = require('./modules/emotion');
const simplify = require('simplify-language');
var hardWords = [
	'abuse',
	'anguish',
	'angiush',
	'anxiety',
	'anxeity',
	'anxious',
	'ancious',
	'anxcious',
	'cruel',
	'cut',
	'death',
	'depressed',
	'depressed',
	'depresed',
	'depression',
	'depresion',
	'despair',
	'despare',
	'dispare',
	'die',
	'fear',
	'grief',
	'grieving',
	'greivin',
	'grievin',
	'griving',
	'helpless',
	'hopelessness',
	'hoplesness',
	'helplessness',
	'hoplessnes',
	'homicide',
	'kill',
	'massacre',
	'murder',
	'murdered',
	'murderer',
	'mutilate',
	'panic',
	'sadness',
	'self harm',
	'scared',
	'slaughterer',
	'sorrow',
	'stigma',
	'stigmer',
	'suffer',
	'suicide',
	'terrified',
	'tragedy',
	'tragic',
	'victim',
	'worthless',
];

var hardTerms = [
	'can\'t cope',
	'end it all',
	'end my life',
];

var softWords = [
	'abnormal',
	'aid',
	'alarm',
	'confusion',
	'confuxon',
	'confuison',
	'confussion',
	'confused',
	'confuxed',
	'confussed',
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
	'seriousnes',
	'strength',
	'symptom',
	'tentative',
	'tentitiv',
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
	'alienaton',
	'alienasion',
	'cope',
	'counsel',
	'councel',
	'discriminate',
	'descriminate',
	'discrimminate',
	'discrimination',
	'descrimination',
	'discrimminasion',
	'endure',
	'esteem',
	'estem',
	'fatigued',
	'fatigue',
	'fatig',
	'fatiged',
	'fight',
	'defeated',
	'defeeted',
	'defeat',
	'defeet',
	'help',
	'hurt',
	'insecure',
	'irritable',
	'ititabble',
	'iritable',
	'irritabble',
	'isolation',
	'icolation',
	'mental',
	'misunderstanding',
	'misunderstand',
	'misunderstood',
	'negative',
	'negativ',
	'overwhelmed',
	'pain',
	'separation',
	'seperate',
	'separate',
	'struggle',
	'sympathetic',
	'sympathitic',
	'therapy',
	'troubled',
	'trouble',
	'uncertain',
	'uncomfortable',
	'uncomfortible',
	'unfulfilled',
	'unfulfiled',
	'unsettling',
	'warning',
	'worry',
	'angry',
	'sad',
	'stressed',
	'stupid',
	'idiot',
	'tough',
	'alone',
	'lost',
	'unhappy'
];

const mediumTerms = [
	'not happy',
	'give up',
	'what\'s the point',
	'whats the point',
	'can\'t change',
	'cant change',
	'too hard',
	'had enough',
	'fed up',
	'out of control',
];

var stress = [
	'stressed',
	'frustrated',
	'distressed',
	'overwhelmed',
	'agony',
	'anxiety',
	'burden',
	'fear',
	'hardship',
	'hassle',
	'strain',
	'tension',
	'trauma',
	'worry',
	'tense'
];

var sad = [
	'agony',
	'helpless',
	'sad',
	'sadness',
	'upset',
	'low',
	'gloomy',
	'grieve',
	'grieved',
	'grief',
	'hurting',
	'lost',
	'unhappy',
	'hurting',
	'depressed',
	'depression',
	'hopeless',
	'hopelessness',
	'heartbroken',
	'weep'
];

const sadTerms = [
	'fed up',
];

var anger = [
	'anger',
	'angry',
	'explode',
	'frustrated',
	'mad',
	'fuming',
	'fury',
	'violence',
	'hatred',
	'hate',
	'disgusting',
	'shit',
	'bloody',
	'pissed',
	'irritating',
	'irritated',
	'irritation',
	'irate',
	'outrage',
	'rage',
	'temper',
	'trauma',
	'traumatic'
];
const angerTerms = [
	'out of control',
	'blow up',
];

var disease = [
	'arthritis',
	'cardiovascular',
	'cancer',
	'apnea',
	'dementia',
	'diabetes'
];
/**
 * Convert array of words into regular expression
 * @param  {String} listId    ID of words list
 * @param  {Array} wordsList Array of words
 * @return {RegEx}           Regular expression used for matching
 */

const dangerRe = convertWordsToRegExp(hardWords);
const dangerTermsRe = convertWordsToRegExp(hardTerms);
const wordsRe = convertWordsToRegExp(mediumWords);
const termsRs = convertWordsToRegExp(mediumTerms);
const indicatorsRe = convertWordsToRegExp(softWords);

function interSection(array1, array2) {
	var intersection = array1.filter(function (n) {
		return array2.indexOf(n) != -1;
	});

	return intersection;
}

function emotionalIndicator(str) {
	str = str.toLowerCase();
	const simpleString = simplify(str);


	var emotionalAlert = false;
	var dangerMatch = (simpleString.match(dangerRe) || []).concat(str.match(dangerTermsRe)).filter((item) => { return item; });
	var wordMatch = (simpleString.match(wordsRe) || []).concat(str.match(termsRs)).filter((item) => { return item; });
	var indicatorsMatch = simpleString.match(indicatorsRe) || [];

	var simpleWords = simpleString.split(/\W+/);
	var words = str.split(/\W+/);
	var wordsLen = words ? words.length : 1;

	var angerMatch = interSection(anger, simpleWords).concat(interSection(angerTerms, words));
	var sadMatch = interSection(sad, simpleWords).concat(interSection(sadTerms, words));
	var stressMatch = interSection(stress, simpleWords);
	var diseaseMatch = interSection(disease, simpleWords);

	if (dangerMatch && dangerMatch.length > 0) {
		emotionalAlert = 3;
	}

	if (wordMatch && wordMatch.length >= 2) {
		emotionalAlert = emotionalAlert + 2;
	}

	if (indicatorsMatch && indicatorsMatch.length > 4) {
		emotionalAlert = emotionalAlert + 1;
	}

	const emotions = emotion(simpleString);

	var response = {
		'anger': ((angerMatch ? angerMatch.length : 0) / wordsLen),
		'sad': ((sadMatch ? sadMatch.length : 0) / wordsLen),
		'stress': ((stressMatch ? stressMatch.length : 0) / wordsLen),
		'danger': ((dangerMatch ? dangerMatch.length : 0) / wordsLen),
		'triggerWords': {
			'anger': angerMatch,
			'sad': sadMatch,
			'stress': stressMatch,
			'alert': dangerMatch.concat(wordMatch).concat(indicatorsMatch)
		},
		...emotions,
	};

	var winner = null;
	var winnerVal = 0;
	for (var key in response) {
		if (response[key] !== 0 && response[key] > winnerVal) {
			winner = key;
			winnerVal = response[key];
		}
	}

	response.emotional = emotionalAlert;
	response.winner = winner;
	response.diseases = diseaseMatch;

	return response;
}

if (module) {
	module.exports = emotionalIndicator;
}
