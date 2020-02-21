const csv = require('fast-csv');
const fs = require('fs');

const collection = fs.createReadStream('collection.csv');
const parser = csv.parse({
	objectMode: true,
	delimiter: ',',
	headers: true
});

collection
	.pipe(parser)
	.on('error', error => console.error(error))
	.on('readable', () => {
		for (let release = parser.read(); release; release = parser.read()) {
			console.log(`[URL='https://www.discogs.com/release/${release.release_id}']${release.Artist} - ${release.Title}[/URL] [Media: ${release['Collection Media Condition']} | Sleeve: ${release['Collection Sleeve Condition']}]`);
		}
	})
	.on('end', (rowCount) => console.log(`\nParsed ${rowCount} rows`));