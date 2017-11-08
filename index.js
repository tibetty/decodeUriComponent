module.exports = s => s.replace(/%([0-9a-f]{2})/gi, (a, c) => String.fromCharCode(parseInt(c, 16))).replace(/%u([0-9a-f]{4})/gi, (a, u) => String.fromCodePoint(parseInt(u, 16)));
