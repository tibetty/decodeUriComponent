decodeUriComponent
==========

A pretty fast yet robust decodeURIComponent implementation that supports unicode support
## Installation

```
npm install decodeuricomponent
```

## Usage
```javascript
const decodeUriComponent = require('decodeuricomponent');

let encodedStr = '2%2e8i%u624b%u52a85%u901f';
console.log(decodeUriComponent(encodedStr));	// --> '2.8i手动5速'
```


Dependency
---------------
None but using ES6 arrow function
