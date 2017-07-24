/*
@Author Tommy Teves
This is a notes app that was designed and written to learn node.js.

This file is where all of the functions that are called from app,js are held.
Please see app.js for a full description of the application.
*/

//Required NPM Installed packages.
const fs = require('fs');

/*
fetchNotes - This will grab all the notes that are stored inside of the database.

Parameters - None.

Returns - This function will return a value the string value of the database.
          Each note will be a value inside of the array.

*/
var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch(e) {
    return [];
  }
};

/*
saveNote - This will save a note inside of the database in the JSON format.

Parameters - Note: Note to be saved.

Returns - N/A.

*/

var saveNote = (note) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(note));
};

/*
addNote - This will create a note that will then call saveNote to be saved into the databse.

Parameters - Title: This is the title of the note. This is used for lookup / duplicate note checking.
             Body: This will be the main message of the note.

Returns - If the note is added without any issues than this function will return the note
            that was created. If the note subject already exists inside of the databse then
            the return value will be the title of the note that we are trying to add.
            If we return a title then we know there is already a note in the database with that
            title.

*/

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var duplicateNote = notes.filter((note) => {
    return note.title === title;
  });
  if(duplicateNote.length === 0){
    notes.push(note);
    saveNote(notes);
    return note;
  }
}

/*
getAll - This will grab all the notes that are stored inside of the database.

Parameters - None.

Returns - This function will return a value the string value of the database.
          Each note will be a value inside of the array.

*/

var getAll = () => {
  return fetchNotes();
};

/*
removeNote - This will remove a note from the database with the same title that is passed in.

Parameters - Title: This is the title of the note that we are looking to delete from the datbase.

Returns - This function will return True or False. If we have a note that is fully removed successfully
          then we will return the boolean value True. If removing the note was unsuccessful then the function
          will return the value False.

*/

var removeNote = (title) => {
  notes = fetchNotes();
  var duplicateNote = notes.filter((note) => {
    return note.title !== title;
  });
  saveNote(duplicateNote);
  if(notes.length !== duplicateNote.length){
    return true;
  }
  return false;
};

/*
getNote - This will grab a specific note inside of the databse baised on the Title.

Parameters - Title: This is the title of the note that we are looking to get.

Returns - This function will return the note with the same title. If we are unsuccessful
          on finding the note that we are looking for than we will return a array of
          null values.

*/

var getNote = (title) => {
  notes = fetchNotes();
  var duplicateNote = notes.filter((note) => {
    return note.title === title;
  });
  return duplicateNote[0];
}

/*
printNote - This will grab a specific note inside of the databse baised on the Title.

Parameters - Title: This is the title of the note that we are looking to print.

Returns - This function will return nothing. Rather it will print to the console the data
          from the note that is looking to be printed. If the note is not found, a message
          "note not found" will be printed.

*/

var printNote = (note) => {
  if(note) {
    console.log('---');
    console.log(`Title : ${note.title}`);
    console.log(`Body: ${note.body}`);
  } else {
    console.log('Note not found.')
  }
};

//EXPORTS
module.exports = {
  addNote: addNote,
  getAll: getAll,
  removeNote: removeNote,
  getNote: getNote,
  printNote: printNote
}
