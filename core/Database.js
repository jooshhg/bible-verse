const Sequelize = require('sequelize');
const path = require('path');

const database = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: path.join(__dirname, '..' ,'db.sqlite')
})
;

class Database {
    static get db() {
        return database;
    }
    
    static get Tables() {
        return {
	    BookKey: require('./Structures/BookKey'),
	    BibleKjv: require('./Structures/BibleKjv')
	}
    }
    
    // Search Bible by book, chapter and verse
    static async searchKjv(b, c, v) {
	if (typeof v == 'string' && v.includes('-')) {
	    v = v.split('-');
	    let verses = [];	
	    for (let i = v[0]; i <= v[1]; i++) {
	       const verse = Database.searchKjv(b, c, i);
		    verses.push(verse);
	    }
	    let output = await Promise.all(verses);
	    return output;
	}

        if (!b) return console.log('Invalid book given');
	if (!c || c > 50 || c < 1) return console.log('Invalid chapter given');
	if (!v || v > 70 || v < 1) return console.log('Invalid verse given');
	const book = await Database.Tables.BookKey.findOne({ where: { n: b }});
        if (!book || book == []) return console.log('Book not found'); 
	const verse = await Database.Tables.BibleKjv.findOne({ where: {b: book.b, v, c } });
	if (!verse || verse == []) return console.log('Verse not found');
	return verse.t;
    }

}

module.exports = Database;
