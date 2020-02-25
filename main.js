const csv = require('fast-csv');		//Used to parse the CSV file
const fs = require('fs');						//Used to read the CSV file

const collection = fs.createReadStream('collection.csv');
//Sets the parameters for the parser
const parser = csv.parse({
	objectMode: true,			//Parses as an object
	delimiter: ',',				//Tells the parser that the CSV uses the comma to differentiate between different entries
	headers: true					//Tells the parser that the CSV uses headers
});

collection
	.pipe(parser)
	.on('error', error => console.error(error))
	.on('readable', () => {
		for (let release = parser.read(); release; release = parser.read()) {
			//My format to be output, can be easily changed to fit any need
			console.log(`[URL='https://www.discogs.com/release/${release.release_id}']${release.Artist} - ${release.Title}[/URL] [ Media: ${release['Collection Media Condition']} | Sleeve: ${release['Collection Sleeve Condition']} ]`);
		}
	})
	//Lists how many entries were parsed
	.on('end', (rowCount) => console.log(`\nParsed ${rowCount} rows`));