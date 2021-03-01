const Sequelize = require('sequelize');
const Database = require('../Database');

const BibleKjv = Database.db.define('t_kjv', {
    id: { 
        type: Sequelize.INTEGER,
	allowNull: false,
	primaryKey: true
    },
    b: {type: Sequelize.INTEGER, allowNull: false},
    c: {type: Sequelize.INTEGER, allowNull: false},
    v: {type: Sequelize.INTEGER, allowNull: false},
    t: {type: Sequelize.TEXT, allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
});

BibleKjv.sync();

module.exports = BibleKjv;
