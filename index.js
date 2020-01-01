const iconv = require('iconv-lite');

module.exports = (s, enc) =>
    enc ? ((s, enc) => {
        let regex = /(%([0-9a-f]{2}))+/gi;
        let res = null, lastIdx = 0, parts = [];
        while (res = regex.exec(s)) {
            parts.push(s.substring(lastIdx, regex.lastIndex - res[0].length));
            parts.push(iconv.decode(new Buffer(res[0].split(/%([0-9a-f]{2})/i).reduce((buff, v) => {
                if (v !== '') buff.push(parseInt(v, 16));
                return buff;
            }, [])), enc));
            lastIdx = regex.lastIndex;
        }
        parts.push(s.substring(lastIdx, s.length));
        return parts.join('');
    })(s, enc) : (s => s.split(/(%u[0-9a-f]{4})/gi).map(v =>
        v.match(/%u[0-9a-f]{4}/gi) ? unescape(v) : decodeURIComponent(v)).join(''))(s);