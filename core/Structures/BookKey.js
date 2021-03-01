const Sequelize = require('sequelize');
const Database = require('../Database');

const BookKey = Database.db.define('key_english', {
	b: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true},
    n: {type: Sequelize.TEXT, allowNull: false}
}, {
    freezeTableName: true,
    timestamps: false
});

BookKey.sync();

module.exports = BookKey;
