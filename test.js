var ea = require('./emotional_alert');

var cases = [
	{ 'text': 'hello how are you?', 'outcome': false },
	{ 'text': 'How about death?', 'outcome': 3 },
	{ 'text': 'I feel overwhelmed', 'outcome': false },
	{ 'text': 'I feel overwhelmed and fatigued', 'outcome': 2 },
	{ 'text': 'I feel abnormal', 'outcome': false },
	{ 'text': 'I feel abnormal and confused', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes about my parents', 'outcome': 1 },
	{ 'text': 'Sometimes I feel a little low', 'outcome': false },
	{ 'text': 'lowness', 'outcome': false },
	{ 'text': 'Sometimes I feel a little low about death', 'outcome': true },
	{ 'text': 'It left me fuming, but at the end of the day I took a deep breath.', 'outcome': false },
	{ 'text': 'It left me fuming, but at the end of the day I took a deep breath. I was still a little mad', 'outcome': false },
	{ 'text': 'I\'ve just been diagnoses with Diabetes', 'outcome': false },
	{ 'text': 'I\'ve had a bad weekend', 'outcome': false },
];

var result;

cases.forEach(function (singleCase) {
	result = ea(singleCase.text);

	if (result.emotional !== singleCase.outcome) {
		console.error('fail', singleCase.text, result);
	} else {
		console.log('pass', singleCase.text, result);
	}
});