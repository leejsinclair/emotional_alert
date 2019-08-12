module.exports = function (wordsList) {
    var regStr = '',
        regExpression;
    // Do not use preset
    for (var i = 0; i < wordsList.length; i++) {
        if (typeof (wordsList[i]) === 'string' && wordsList[i].length > 0) {
            regStr += ((i !== 0) ? '|' : '') + wordsList[i];
        }
    }

    regStr = '\\b(' + regStr + ')\\b';


    regExpression = new RegExp(regStr, 'gmi');

    return regExpression;
}
