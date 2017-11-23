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


Dependency
---------------
* Use iconv-lite to make encoding conversion;
* Arrow function feature of ES6
