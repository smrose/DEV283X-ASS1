/* ass1.js
 *
 *  This fine script has the task of processing a file of CSV data to JSON
 *  and storing it in a file. We'll use the 'csvtojson' module to perform
 *  the conversion and the fs module to create the output file.
 */

const csv = require('csvtojson')
const fs = require('fs')
const infile = 'customer-data.csv'
const outfile = 'customer-data.json'
var them = []

csv().fromFile(infile).on('header', (fields) => {

    // We've found the header - that's good, right?
    
    console.log(`Processing '${infile}' has begun; records each have ${fields.length} fields`)
}).on('json', (jsonObj) => {

    // Another record to be pushed. Whee!!!
    
    them.push(jsonObj)
}).on('done', () => {

    /* We're done with the file, and nothing went wrong yet. We have
     * an array of JSON objects, which delights us - don't get us
     * wrong - but the instructor wants a file, and who are we to
     * argue? First, build a string from the array. */
    
    console.log(`Input file is processed - ${them.length} records - to the ramparts!`)
    let buffy = ''
    them.forEach(function(record) {
	try {
	    buffy += JSON.stringify(record)
	} catch(e) {
	    console.error(e.message)
	    return(-1)
	}
    })

    console.log(`Created a string of ${buffy.length} characters`)
    
    /* We have our string - write it to the file. */
    
    try {
	fs.writeFileSync(outfile, buffy)
    } catch(e) {
    	console.error(e.message)
	return(-1)
    }
    console.log(`Output file '${outfile}' is written`)
}).on('error', (error) => {

    // Not my fault!!!
    
    console.error(`Bad news: ${error.message}`)
    return(-1)
})
