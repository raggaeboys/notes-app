const chalk = require('chalk');
const log  = require('console');
const fs = require('fs');
const title = require('process');

const addNote  = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) =>note.title === title)   
    const duplicateNote = notes.find((note) => note.title === title)

        
    if (!duplicateNote) {// That means if it didn't find anything then add the new notes.
        notes.push({
        title: title,
        body: body
    })
        saveNotes(notes)
        console.log(chalk.bgBlue('New note added!'))
    }else{
        console.log('Note title taken!');
    }   
    
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.blue.bgRed.bold(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
    
}


const removeNote  = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreen('note removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed('No note found'));
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//Below we are going to read the JSON file that we created.
const loadNotes = () => {
    try{
    
       const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString() //2. change buffer to string.
        return JSON.parse(dataJSON)//3. parse the data
    } catch (e) {
        return[]
    }
    
}


//Prints out the notes sa
const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'));
    notes.forEach((item, index, array) => {
        console.log(index, item.title);
    })
    
}


module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
} 