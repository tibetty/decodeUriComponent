const decodeUriComponent = require('./index.js');

process.on('warning', w => { if (w.name === 'DeprecationWarning') { process.stdout.write('Failed: ' + w.message + '\n'); process.exit(1); } });

function pass() {
    process.stdout.write('OK\n');
}

function fail(message) {
    process.stdout.write(message + '\n');
    process.exit(1);
}

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
        decodeString: '%B7%FE%D7%B0',
        decodeEncoding: 'gbk',
        expected: '服装',
    },
    {
        decodeString: '%b7%fe%d7%b0.txt',
        decodeEncoding: 'gbk',
        expected: '服装.txt',
    },
    {
        decodeString: '%E4%B8%AD%u624b',
        expected: '中手',
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
    },
    // unicode escapes, in both modes
    {
        decodeString: '%uD83D%uDE00',
        expected: '😀',
    },
    {
        decodeString: '%uD83D%uDE00',
        decodeEncoding: 'gbk',
        expected: '😀',
    },
    {
        decodeString: 'a%u624b',
        decodeEncoding: 'gbk',
        expected: 'a手',
    },
    {
        decodeString: '%b7%fe%u624b%d7%b0',
        decodeEncoding: 'gbk',
        expected: '服手装',
    },
    // literal '%' that does not start an escape
    {
        decodeString: '100%',
        expected: '100%',
    },
    {
        decodeString: '%zz',
        expected: '%zz',
    },
    {
        decodeString: 'a%u12',
        expected: 'a%u12',
    },
    {
        decodeString: '%',
        expected: '%',
    },
    {
        decodeString: 'a%u12',
        decodeEncoding: 'gbk',
        expected: 'a%u12',
    },
    // '+' stays '+', plain text passes through
    {
        decodeString: 'a+b',
        expected: 'a+b',
    },
    {
        decodeString: 'plain text',
        expected: 'plain text',
    },
    {
        decodeString: '',
        expected: '',
    },
    // valid and invalid byte escapes in the same run
    {
        decodeString: '%41%42c',
        expected: 'ABc',
    },
    {
        decodeString: '%e4',
        expected: '%e4',
    },
    {
        decodeString: '%E4%B8%AD%e4',
        expected: '中%e4',
    },
    {
        decodeString: '%ff%41',
        expected: '%ffA',
    },
    {
        decodeString: '%c0%af',
        expected: '%c0%af',
    },
    {
        decodeString: '%ed%a0%80',
        expected: '%ed%a0%80',
    }
].forEach(function(testCase) {
    var actual;
    if (testCase.decodeEncoding) {
        actual = decodeUriComponent(testCase.decodeString, testCase.decodeEncoding);
    } else {
        actual = decodeUriComponent(testCase.decodeString);
    }
    if (actual === testCase.expected) {
        pass();
    } else {
        fail(`Failed (decodeString=${testCase.decodeString}, decodeEncoding=${testCase.decodeEncoding}, expected=${testCase.expected}, actual=${actual})`);
    }
});

// an unknown encoding still throws iconv's error
try {
    decodeUriComponent('%41', 'nope-enc');
    fail('Failed (unknown encoding did not throw)');
} catch (e) {
    pass();
}

// deterministic PRNG, no Math.random
function makeRandom(seed) {
    let state = seed >>> 0;
    return function() {
        state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
        return state / 4294967296;
    };
}

const alphabet = ['%', 'u', 'e', '4', 'b', 'Z', 'a', '0', 'f', 'D', '8'];
const random = makeRandom(20261121);
for (let n = 0; n < 2000; n++) {
    let input = '';
    const length = Math.floor(random() * 21);
    for (let i = 0; i < length; i++) {
        input += alphabet[Math.floor(random() * alphabet.length)];
    }
    try {
        decodeUriComponent(input);
    } catch (e) {
        fail(`Failed (fuzz input=${JSON.stringify(input)} threw ${e})`);
    }
}
pass();
