var ea = require('./emotional_alert');

var cases = [
	{ 'text': 'hello how are you?', 'outcome': false, 'bayes': 'joy' },
	{ 'text': 'How about death?', 'outcome': 3, 'bayes': 'sadness' },
	{ 'text': 'I feel overwhelmed', 'outcome': false, 'bayes': 'fear' },
	{ 'text': 'I feel overwhelmed and fatigued', 'outcome': 2, 'bayes': 'fear' },
	{ 'text': 'I feel abnormal', 'outcome': false, 'bayes': 'sadness' },
	{ 'text': 'I feel abnormal and confused', 'outcome': false, 'bayes': 'fear' },
	{ 'text': 'I feel abnormal and confused because I have issues', 'outcome': false, 'bayes': 'fear' },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes', 'outcome': false, 'bayes': 'fear' },
	{ 'text': 'I feel abnormal and confused because I have issues with jokes about my parents', 'outcome': 1, 'bayes': 'sadness' },
	{ 'text': 'Sometimes I feel a little low', 'outcome': false, 'bayes': 'sadness' },
	{ 'text': 'lowness', 'outcome': false, 'bayes': 'sadness' },
	{ 'text': 'Sometimes I feel a little low about death', 'outcome': 3, 'bayes': 'sadness' },
	{ 'text': 'i was fuming as i walked home from work that night angry at almost anyone who looked my way feeling as though everyone and anyone i past on my way was more successful than me and pulling in the big bucks', 'outcome': false, 'bayes': 'anger' },
	{ 'text': 'It left me fuming, but at the end of the day I took a deep breath. I was still a little mad', 'outcome': false, 'bayes': 'anger' },
	{ 'text': 'I\'ve just been diagnoses with Diabetes', 'outcome': false, 'bayes': 'sadness' },
	{ 'text': 'I\'ve had a bad weekend', 'outcome': false, 'bayes': 'sadness' },
	{ 'text': 'I felt anxious about todays meeting', outcome: 3, 'bayes': 'fear' },
	{ 'text': 'i was struggling with these awful feelings and was saying such sweet things about not deserving my and my sisters friendship and we agreed well she was in her car just starting to drive away when she reached out her hand', outcome: false, 'bayes': 'sadness' },
	{ 'text': 'i can put on it without words since i just cant type on that it was so lovely this morning yes im feeling sarcastic today', outcome: false, 'bayes': 'anger' },
	{ 'text': 'i actually think i am a fairly authentic person generally i am pretty honest about my opinions desires etc and almo… https://t.co/mhUAVoPwkd', outcome: false, 'bayes': 'joy' },

	{ 'text': 'i am feeling incredibly thankful for this year my children', outcome: false, 'bayes': 'joy' },
	{ 'text': 'im with my grandparents i feel like the time is very precious', outcome: false, 'bayes': 'joy' },
	{ 'text': 'im feeling a lot more confident walking outside', outcome: false, 'bayes': 'joy' },

	{ 'text': 'i feel somewhat ashamed', outcome: false, 'bayes': 'sadness' },
	{ 'text': 'i feel broke inside but i wont admit', outcome: false, 'bayes': 'sadness' },
	{ 'text': 'i just feel so disillusioned at the moment', outcome: false, 'bayes': 'sadness' },

	{ 'text': 'i feel that these types of people are the most dangerous in any situation', outcome: false, 'bayes': 'anger' },
	{ 'text': 'i feel rather disgusted after seeing his photography', outcome: false, 'bayes': 'anger' },
	{ 'text': 'i feel enraged when some people are happy', outcome: false, 'bayes': 'anger' },

	{ 'text': 'i don t like to feel uncomfortable with being alone and being quiet', outcome: 2, 'bayes': 'fear' },
	{ 'text': 'i have to admit is the only time i feel a bit shaky', outcome: false, 'bayes': 'fear' },
	{ 'text': 'i feel pressured by a dumb feeling', outcome: false, 'bayes': 'fear' },
];

var result;

cases.forEach(function (singleCase) {
	result = ea(singleCase.text);

	if (result.emotional !== singleCase.outcome) {
		console.error('fail', singleCase.text, result);
	} else if (singleCase.bayes && singleCase.bayes !== result.bayes.prediction) {
		console.log(`FAIL: expected ${singleCase.text} to result in ${singleCase.bayes} classification but was ${result.bayes.prediction}`);
	} else if (singleCase.bayes && singleCase.bayes == result.bayes.prediction) {
		console.log(`PASS: ${singleCase.text} - ${result.bayes.prediction.toUpperCase()}`);
	} else {
		console.log('pass', singleCase.text, result);
	}
});
