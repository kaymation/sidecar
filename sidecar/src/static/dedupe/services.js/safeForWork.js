const badWords = [
    'fuck',
    'shit',
    'blowjob',
    'sex',
    'cunt',
    'penis',
    'clitoris',
    'vagina',
    'piss',
    'hand job',
]

const makeSafeForWork = (text) => {
    var result = text;
    badWords.forEach(word => {
        const regex = new RegExp(word, 'ig');
        result = result.replace(regex, '****');
    });
    return result;
}

export default makeSafeForWork
