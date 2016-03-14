var path = './public/data.js';
var path2 = './build/output.json';

var fs = require('fs');

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

function parseCardLine(line) {
	var parts = line.split(';');
	var codexId = Number(parts[15]);

	if (parts.length < 16) { console.log(parts); return {}; }
	console.log(line)
	return {
		id: Number(parts[0]),
		color: parts[1],
		name: parts[2],
		type: parts[3],
		//a: parts[4],// - unused (probably used to be gold cost?)
		faeriaCost: Number(parts[5]),
		islands: Number(parts[6]),
		forests: Number(parts[7]),
		mountains: Number(parts[8]),
		deserts: Number(parts[9]),
		attack: Number(parts[10]),
		health: Number(parts[11]),
		text: parts[12].replace(/"/g, ''), //strip double quotes
		//b: parts[13], //unused
		questReward: parts[14] === '2' ? true : false,
		codexId: codexId,
		rarity: parts[16],
		uncollectable: codexId === 106666	? true : false
	};
}

var data = fs.readFileSync('./resources/object_data.block');
var stringData = data.toString('ascii');
//find the card data block
var prt = stringData.split('merlin_shortened');
var prt2 = prt[1].split('<b>Borderlands</b>');
var rawCardData = prt2[0];

//solit it and trash the last one
var lines = rawCardData.split('\n');
delete lines[lines.length - 1];

//parse all the lines into cards
var cards = [];
lines.forEach(function(line) {
	var parsed = parseCardLine(line);
	if (!parsed.id) { return; }
	cards.push(parsed);
});
//fix the id on the first one
//cards[0].id = 1;

//write the two versions
var jsonCards = JSON.stringify(cards, null, 2)
write(path, 'var data=' + jsonCards+';');
write(path2, jsonCards)