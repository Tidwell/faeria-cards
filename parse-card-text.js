var fs = require('fs');

module.exports = function getCards() {
  const data = fs.readFileSync('./tmp/cards.csv', 'utf-8');

  const lines = data.split('\n');
  //parse all the lines into cards
  const cards = {};
  lines.forEach(function(line) {
    const lineTxt = line.split(';');
    //we only care about the lines that contain text
    if (lineTxt[0].indexOf('text') === -1) {
      return;
    }
    const cardId = lineTxt[0].split('.')[0];
    cards[cardId] = lineTxt[1] || '';
  });
  return cards;
}
