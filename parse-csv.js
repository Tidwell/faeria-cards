var path = './public/data.js';
var path2 = './build/output.json';

var fs = require('fs');

const getCards = require('./parse-card-text');

function write(path, data) {
	try {
		fs.unlinkSync(path);
	} catch (e) {}
	fs.writeFile(path, data, function(err) {
		if (err) {
			return console.log(err);
		}

		console.log('Saved js file in ' + path);
	});
}

const cardText = getCards();

function parseCardLine(line) {
	var parts = line.split(';');
	var codexId = Number(parts[13]);
	if (parts.length !== 15) {
		return false;
	}
	return {
		id: Number(parts[0]),
		color: parts[1],
		name: parts[2],
		type: parts[3],
		creatureType: parts[4],
		faeriaCost: Number(parts[5]),
		wild: Number(parts[6]),
		islands: Number(parts[7]),
		forests: Number(parts[8]),
		mountains: Number(parts[9]),
		deserts: Number(parts[10]),
		attack: Number(parts[11]),
		health: Number(parts[12]),
		text: (cardText[Number(parts[0])] || '').replace(/"/g, ''), //strip double quotes
		//b: parts[14], //unused
		//questReward: parts[13] === '2' ? true : false,
		codexId: codexId,
		rarity: parts[14],
		uncollectable: codexId === 106666	? true : false
	};
}

var data = fs.readFileSync('./tmp/merlin_shortened.csv', 'utf-8');

console.log(data);
//solit it and trash the last one
var lines = data.split('\n');

//parse all the lines into cards
var cards = [];
lines.forEach(function(line) {
	var card = parseCardLine(line);
	if (!card) { return; }
	cards.push(card);
});

//write the two versions
var jsonCards = JSON.stringify(cards, null, 2)
write(path, 'var data=' + jsonCards+';');
write(path2, jsonCards)
