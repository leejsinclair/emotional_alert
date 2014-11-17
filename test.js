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
	{ 'text': 'I feel abnormal and confused because I have issues with jokes about my parents', 'outcome': 1 }
];

var result;

cases.forEach(function(singleCase){
	result = ea(singleCase.text);
	if( result!==singleCase.outcome) {
		console.error('fail', singleCase.text, result);
	} else {
		console.log('pass', singleCase.text);
	}
});