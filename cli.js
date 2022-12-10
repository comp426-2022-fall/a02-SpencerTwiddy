#!/usr/bin/env node
import minimist from 'minimist';
import process from 'process';
import moment from 'moment-timezone';
var options = minimist(process.argv.slice(2));
console.log("helium");
if (options.h) {
	var help_message = `Usage: ./galo.sh [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE                                                                                                                                                                          -h            Show this help message and exit.                                                                          -n, -s        Latitude: N positive; S negative.                                                                         -e, -w        Longitude: E positive; W negative.                                                                        -z            Time zone: uses /etc/timezone by default.                                                                 -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.                                                       -v            Verbose output: returns full weather forecast.                                                            -j            Echo pretty JSON from open-meteo API and exit.`
	console.log(help_message);
	process.exit(0);
}
const timezone = moment.tz.guess();
console.log(timezone);
console.log("made it to the end");
