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

var shuffleWordArray = (arr) => {
	/**
	 * Randomly shuffle an array
	 * https://stackoverflow.com/a/2450976/1293256
	 * @param  {Array} array The array to shuffle
	 * @return {String}      The first item in the shuffled array
	 */
	var shuffle = function (array) {

		var currentIndex = array.length;
		var temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	};

	return shuffle(arr)
}

var sliceWordArray = (arr, n) => {
	return arr
}

// get word string
var wordString = getWordString().toLowerCase()
// make wordString into array
var words = wordString.split(',')
// print words!
console.log(words)
// shuffle words
shuffleWordArray(words)
// print words again!
console.log(words)

// get first 25 words from shuffled array
// console.log(`first 25 words:\n[${words.slice(0,25)}]\n`)
// get first 25 words from shuffled array
/*
	var boardWords = wordArray.slice(0,25)
	// print 'em
	console.log(`\nfirst 25 words:\n`)
	for (let i = 0; i < 5; i++) {
		console.log(boardWords.slice(i*5,(i*5)+5))
	}
*/

// create 2D word array
var boardArray = new Array(5)
for (var i = 0; i < boardArray.length; i++) {
	let j = 5*i
	boardArray[i] = words.slice(j,j+5)
}
console.log(boardArray)

// create 2D color array
const colors = []
for (let i = 0; i < 9; i++) { // add 9 reds
	colors.push('red')
}
for (let i = 0; i < 8; i++) { // add 8 blues
	colors.push('blue')
}
for (let i = 0; i < 7; i++ ) { // add 7 whites
	colors.push('neutral')
}
colors.push('assassin') // add 1 black
shuffleWordArray(colors) // shuffle colors array
var colorArray = new Array(5) // initialize new array
for (var i = 0; i < colorArray.length; i++) { // loop over array
	let j = 5*i
	colorArray[i] = colors.slice(j,j+5) // add row to array
}
console.log(colorArray) // print to console

// add colors to boardArray 
var coloredBoardArray = new Array(5)
for (let i = 0; i < 5; i++) {
	coloredBoardArray[i] = []
	for (let j = 0; j < 5; j++) {
		coloredBoardArray[i][j] = [boardArray[i][j],colorArray[i][j]]
		console.log(`(${i},${j}): [${boardArray[i][j]}, ${colorArray[i][j]}]`)
	}
}
console.log(coloredBoardArray)

// make innerHTML
var makeTableHtmlString = () => {
	let tableHtmlString = `\n<table id="boardTable">\n` // #boardTable
	let i = 0
	boardArray.forEach(row => {
		tableHtmlString += `\n<tr class=">\n`
		row.forEach(word => {
			tableHtmlString += `<td>${i+=1 }</td>`
		})
		tableHtmlString += `\n</tr>\n`
	})
	tableHtmlString += `\n</table>\n`
	document.getElementById("board").innerHTML = tableHtmlString
}

let tableHtmlString = `\n<table>\n`
coloredBoardArray.forEach(row => {
	tableHtmlString += `\n<tr>\n`
	row.forEach(word => {
		tableHtmlString += `<td class="${word[1]}">${word[0]}</td>`
	})
	tableHtmlString += `\n</tr>\n`
})
tableHtmlString += `\n</table>\n`
console.log(tableHtmlString)
document.getElementById("board").innerHTML = tableHtmlString

function chooseMode(mode) {
	return mode
}

console.log(chooseMode("player"))

var changeMode = (modeToSet) => {
	let modeElement = document.getElementsByClassName("mode")
	console.log(modeElement)
	let modeID = modeElement[0].id
	console.log(`modeID = ${modeID}; modeToSet = ${modeToSet}`)
	modeElement[0].id = modeToSet
	// this works: document.getElementById(modeToSet).innerHTML = 'spy'
}
changeMode('spymaster')
