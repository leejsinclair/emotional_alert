var ea = require('./emotional_alert');

var cases = [
	{ 'text': 'hello how are you?', 'outcome': false },
	{ 'text': 'How about death?', 'outcome': true },
	{ 'text': 'I feel overwhelmed', 'outcome': false },
	{ 'text': 'I feel overwhelmed and fatigued', 'outcome': true },
	{ 'text': 'I feel abnormal', 'outcome': false },
	{ 'text': 'I feel abnormal and confused', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes', 'outcome': false },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes about my parents', 'outcome': true }
];

cases.forEach(function(singleCase){
	if( ea(singleCase.text)!==singleCase.outcome) {
		console.error('fail', singleCase.text);
	} else {
		console.log('pass', singleCase.text);
	}
});