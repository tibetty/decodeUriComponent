const decodeUriComponent = require('./index.js');

let ts2d = [
	'%25',	//=> '%' 
	'%',	//=> '%' 
	'st%C3%A5le',	//=> 'ståle' 
	'%st%C3%A5le%',	//=> '%ståle%'
	'%%7Bst%C3%A5le%7D%',	//=> '%{ståle}%' 
	'%7B%ab%%7C%de%%7D',	//=> '{%ab%|%de%}' 
	'%FE%FF',	//=> '\uFFFD\uFFFD' 
	'%C2',	//=> '\uFFFD' 
	'%C2%B5',	//=> 'µ'
	'2%2e8i%u624b%u52a85%u901f'	//=>'2.8i手动5速'
];

ts2d.forEach((s) => console.log(decodeUriComponent(s)));
