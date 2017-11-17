module.exports = s => s.split(/(%u[0-9a-f]{4})/gi).map(v => {
	if (v.match(/%u[0-9a-f]{4}/gi)) return String.fromCodePoint(parseInt(v.substring(2), 16));
	else return decodeURIComponent(v);
}).join('');
