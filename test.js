const decodeUriComponent = require('./index.js');

let ts2d = [
	'%25',	//=> '%' 
	'st%C3%A5le',	//=> 'ståle' 
	'%C2%B5',	//=> 'µ'
	'2%2e8i%u624b%u52a85%u901f',	//=>'2.8i手动5速'
	'%e6%9c%8d%e8%a3%85'
];

ts2d.forEach((s) => console.log(decodeUriComponent(s)));
