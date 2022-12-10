#!/usr/bin/env node
import minimist from 'minimist';
import process from 'process';
import moment from 'moment-timezone';
import fetch from 'node-fetch';
import fs from 'fs';
var options = minimist(process.argv.slice(2));
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
if (((!options.n + !options.s != 1) || (!options.w + !options.e != 1)) && typeof options.j === 'undefined') {
	var compass_error = `Latitude must be in range`;
	console.log(compass_error);
	process.exit(1);
}
let long_inp = options.e;
if (options.w) {
	long_inp = -options.w;
}
let lat_inp = options.n;
if (options.s) {
	lat_inp = -options.s;
}
let timezone = moment.tz.guess();
if (options.z) {
	timezone = options.z;
}
if ((typeof lat_inp === 'undefined' || typeof long_inp === 'undefined') && typeof options.j !== 'undefined') {
	//var json_error = `Latitude must be in range`;
	//console.log(json_error);
	process.exit(0);
}
const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + lat_inp + "&longitude=" + long_inp + "&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,precipitation_hours,windspeed_10m_max,windgusts_10m_max,winddirection_10m_dominant&current_weather=true&temperature_unit=fahrenheit&windspeed_unit=mph&precipitation_unit=inch&timezone=" + timezone);
const data = await response.json();
if (options.j) {
	console.log(JSON.stringify(data));
	process.exit(0);
}
let days = options.d;
if (typeof options.d === 'undefined') {
	days = 1;
}
if (days < 0 || days > 6) {
	console.log("Day option -d must be 0-6");
	process.exit(1);
}
let result = "probably won't";
if (data.daily.precipitation_hours[days] > 0) {
	result = "might";
}
let readout = "You " + result + " need your galoshes ";
if (days == 0) {
  console.log(readout + "today.")
} else if (days > 1) {
  console.log(readout + "in " + days + " days.")
} else {
  console.log(readout + "tomorrow.")
}
