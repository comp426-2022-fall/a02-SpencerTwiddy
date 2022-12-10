#!/usr/bin/env node
import minimist from 'minimist';
import process from 'process';
var options = minimist(process.argv.slice(2));
console.log("helium");
if (options.h) {
	console.log("help me tho");
	process.exit(0);
}
console.log("made it to the end");
