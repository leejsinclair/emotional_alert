var words = ["had enough",
	"fed up",
	"angry",
	"out of control",
	"sad",
	"stressed",
	"any sware words",
	"give up",
	"whats the point",
	"can't change",
	"too hard",
	"stupid",
	"idiot",
	"tough",
	"alone",
	"lost",
	"not happy",
	"unhappy"
];

var indicators = [
	"cant", "can't", "must", "should"
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


	regExpression = new RegExp(regStr, "gmi");

	return regExpression;
}

var wordsRe = convertWordsToRegExp(words);
var indicatorsRe = convertWordsToRegExp(indicators);

function emotionalIndicator(str) {
	var emotionalAlert = false;
	var wordMatch = str.match(wordsRe);
	var indicatorsMatch = str.match(indicatorsRe);

	words.forEach(
		function( word ) {
			var wReg = convertWordsToRegExp([word]);
			var matches = str.match(wReg);
			if( matches && matches.length>1 ) {
				emotionalAlert = true;
			}
		}
	);

	/*
	indicators.forEach(
		function( word ) {
			var wReg = convertWordsToRegExp([word]);
			var matches = str.match(wReg);
			if( matches && matches.length>4 ) {
				emotionalAlert = true;
			}
		}
	);
	*/

	if( wordMatch && wordMatch.length>2 ) {
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
