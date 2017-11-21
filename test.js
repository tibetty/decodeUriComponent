const decodeUriComponent = require('./index.js');

console.log(decodeUriComponent('2%2e8i%u624b%u52a85%u901f'));
console.log(decodeUriComponent('%e4%b8%ad%e5%9c%8b'));
console.log(decodeUriComponent('%b7%fe%d7%b0', 'gbk'));
