const decodeUriComponent = require('./index.js');

let ts2d = [
	'%25',	//=> '%' 
	'st%C3%A5le',	//=> 'ståle' 
	'%C2%B5',	//=> 'µ'
	'2%2e8i%u624b%u52a85%u901f'	//=>'2.8i手动5速'
];

ts2d.forEach((s) => console.log(decodeUriComponent(s)));
console.log(decodeUriComponent('%b7%fe%d7%b0', 'gbk'));
