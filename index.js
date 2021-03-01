#!/usr/bin/env node

const args = require('yargs').argv;
const Database = require('./core/Database');

if (!args.b) return console.log('Missing book reference -b');
if (!args.v) return console.log('Missing verse and chapter denoted by a colon -v');

const [ chapter, verse ] = args.v.split(':');


async function main() {
    const output = await Database.searchKjv(args.b, chapter, verse);
    return output;
}

main().then(verse => {
    console.log(verse);
	//process.stdout.write(verse);
});

