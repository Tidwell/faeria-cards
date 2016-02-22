var path = './public/data.js';
var path2 = './build/output.json';

var fs = require('fs');
var data = fs.readFileSync('./resources/object_data.block');

var s = data.toString('ascii');
var prt = s.split('merlin_shortened');
var prt2 = prt[1].split('<b>Borderlands</b>');
var c = prt2[0];
var lines = c.split('\n');
delete lines[lines.length - 1];
var cards = [];

lines.forEach(function(line) {
	var parts = line.split(';');
	cards.push({
		id: parts[0],
		color: parts[1],
		name: parts[2],
		type: parts[3],
		//a: parts[4], - unused (probably used to be gold cost?)
		faeriaCost: Number(parts[5]),
		islands: Number(parts[6]),
		forests: Number(parts[7]),
		mountains: Number(parts[8]),
		deserts: Number(parts[9]),
		attack: Number(parts[10]),
		health: Number(parts[11]),
		text: parts[12],
		//h: parts[13], no clue?
		questReward: parts[14] === '2' ? true : false,
		//i: parts[15], some kind of id? duplicates in groups
		rarity: parts[16]
	});
});
cards[0].id = 1;

cards.forEach(function(c) {
	c.id = Number(c.id);
	c.text = c.text.replace(/"/g, '');
});
var fs = require('fs');
//write the public view
try {
	fs.unlinkSync(path);
} catch (e) {}
fs.writeFile(path, 'var data=' + JSON.stringify(cards, null, 2)+';', function(err) {
	if (err) {
		return console.log(err);
	}

	console.log('Saved js file in ' + path);
});

//write the json view
try {
	fs.unlinkSync(path2);
} catch (e) {}
fs.writeFile(path2, JSON.stringify(cards, null, 2), function(err) {
	if (err) {
		return console.log(err);
	}

	console.log('Saved json file in ' + path2);
});