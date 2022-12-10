#!/usr/bin/env node
import minimist from 'minimist';
import process from 'process';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
var options = minimist(process.argv.slice(2));
console.log("helium");
if (options.h) {
	var help_message = `Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`
	console.log(help_message);
	process.exit(0);
}
if (!(options.n || options.s) || !(options.w || options.e)) {
	var compass_error = `You have compass error`;
	console.log(compass_error);
}
let lat_inp = options.w;
if (options.e) {
	lat_inp = options.e;
}
let long_inp = options.n;
if (options.s) {
	long_inp = options.s;
}
const timezone = moment.tz.guess();
console.log(timezone);
const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat_inp + "&longitude=" + long_inp);
console.log("made it to the end");
