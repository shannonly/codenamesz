let fs = require('fs')

const boardSize = 25

var getWordString = () => {
	let words = ''
	fs.readFile('words.txt', 'utf8', function(err, data) {
        	if(err) {
        	        console.log('There was a problem reading the file')
        	} else {
			words += data.split(',')
                	console.log(words)
        	}
	})
	return words
}

// get word string
var wordString = getWordString().toLowerCase()
// print words!
console.log(wordString)
