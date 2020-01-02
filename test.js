const decodeUriComponent = require('./index.js');

[
    {
        decodeString: '%e4%b8%ad%e5%9c%8b',
        expected: '中國',
    },
    {
        decodeString: '2%2e8i%u624b%u52a85%u901fabc',
        expected: '2.8i手动5速abc',
    },
    {
        decodeString: '%b7%fe%d7%b0',
        decodeEncoding: 'gbk',
        expected: '服装',
    },
    {
        decodeString: 'abc%EE%F9%E4%20abc%EE%F9%E4abc',
        decodeEncoding: 'windows-1255',
        expected: 'abcמשה abcמשהabc'
    },
    {
        decodeString: 'abcdefg',
        decodeEncoding: 'windows-1255',
        expected: 'abcdefg'
    }
].forEach(function(testCase) {
    var actual;
    if (testCase.decodeEncoding) {
        actual = decodeUriComponent(testCase.decodeString, testCase.decodeEncoding);
    } else {
        actual = decodeUriComponent(testCase.decodeString);
    }
    if (actual === testCase.expected) {
        process.stdout.write('OK\n');
    } else {
        process.stdout.write(`Failed (decodeString=${testCase.decodeString}, decodeEncoding=${testCase.decodeEncoding}, expected=${testCase.expected}, actual=${actual})\n`)
        process.exit(1)
    }
});
