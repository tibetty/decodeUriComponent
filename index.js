'use strict';

const iconv = require('iconv-lite');

// Number of bytes in a UTF-8 sequence that starts with the given byte, 0 if invalid.
const sequenceLength = byte => byte < 0x80 ? 1
    : byte >= 0xc2 && byte <= 0xdf ? 2
    : byte >= 0xe0 && byte <= 0xef ? 3
    : byte >= 0xf0 && byte <= 0xf4 ? 4 : 0;

// Turns a run of byte escapes such as '%e4%b8%ad' into a byte array.
function toBytes(run) {
    const bytes = [];
    for (let i = 1; i < run.length; i += 3) bytes.push(parseInt(run.slice(i, i + 2), 16));
    return bytes;
}

// Decodes a run of byte escapes as UTF-8, keeping every byte that is not part
// of a valid sequence as its original escape text (case preserved).
function decodeUtf8(run) {
    // Fast path: a run that is entirely valid UTF-8 decodes in one go.
    try {
        return decodeURIComponent(run);
    } catch (e) {
        // Not valid UTF-8, so fall through to the lenient byte-by-byte loop.
    }
    const bytes = toBytes(run);
    const parts = [];
    for (let i = 0; i < bytes.length;) {
        const len = sequenceLength(bytes[i]);
        const valid = len > 0 && i + len <= bytes.length &&
            bytes.slice(i + 1, i + len).every(b => b >= 0x80 && b <= 0xbf);
        let decoded = null;
        if (valid) {
            try {
                decoded = decodeURIComponent(run.slice(i * 3, (i + len) * 3));
            } catch (e) {
                decoded = null; // overlong, surrogate or above U+10FFFF
            }
        }
        parts.push(decoded === null ? run.slice(i * 3, i * 3 + 3) : decoded);
        i += decoded === null ? 1 : len;
    }
    return parts.join('');
}

module.exports = (s, enc) => {
    const regex = /%u([0-9a-f]{4})|((?:%[0-9a-f]{2})+)/gi;
    const parts = [];
    let last = 0;
    let match;
    while ((match = regex.exec(s)) !== null) {
        parts.push(s.slice(last, match.index));
        if (match[1] !== undefined) {
            parts.push(String.fromCharCode(parseInt(match[1], 16)));
        } else if (enc) {
            parts.push(iconv.decode(Buffer.from(toBytes(match[2])), enc));
        } else {
            parts.push(decodeUtf8(match[2]));
        }
        last = regex.lastIndex;
    }
    parts.push(s.slice(last));
    return parts.join('');
};
