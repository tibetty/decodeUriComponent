decodeUriComponent
==========

A pretty fast yet robust decodeURIComponent implementation that supports unicode decoding (i.e. %uxxxx). Now also support other custom encodings such as gbk, big5, shift-jis, euc-jp, etc.
## Installation

```
npm install decodeuricomponent
```

## Usage
```javascript
const decodeUriComponent = require('decodeuricomponent');

console.log(decodeUriComponent('2%2e8i%u624b%u52a85%u901f'));	// --> '2.8i手动5速'
console.log(decodeUriComponent('%e4%b8%ad%e5%9c%8b'));		// --> '中國'
console.log(decodeUriComponent('%b7%fe%d7%b0', 'gbk'));		// --> '服装'
```

## Behaviour

- A **byte escape** is `%` plus two hex digits; a **unicode escape** is `%u` plus four hex digits. Hex digits are case-insensitive.
- A unicode escape decodes to that UTF-16 code unit (`String.fromCharCode`), so consecutive escapes combine into surrogate pairs: `%uD83D%uDE00` -> 😀.
- A `%` that does not start a valid byte or unicode escape is kept as literal text: `100%` -> `100%`, `%zz` -> `%zz`, `a%u12` -> `a%u12`.
- `+` is not converted to a space, and plain text passes through unchanged.
- Without an encoding, a maximal run of byte escapes is decoded as UTF-8. Bytes that do not form a valid UTF-8 sequence (truncated, overlong, invalid lead or continuation, surrogate, above U+10FFFF) stay as their original escape text, case preserved, while valid sequences in the same run still decode: `%E4%B8%AD%e4` -> `中%e4`, `%ff%41` -> `%ffA`, `%c0%af` -> `%c0%af`.
- With an encoding, a maximal run of byte escapes is decoded by `iconv.decode`, so iconv-lite's replacement character applies to bytes it cannot decode.
- Malformed input never throws in UTF-8 mode. An unknown encoding still throws iconv-lite's error.

## Changes in 0.4.0

- Malformed escapes no longer throw `URIError`; they are returned as literal text. This is a breaking change for callers that relied on the throw.
- `%uXXXX` escapes are now decoded when an encoding is passed, not only in UTF-8 mode.


Dependency
---------------
* Use iconv-lite to make encoding conversion;
* Node.js 18 or later
