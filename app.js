/*
@Author Tommy Teves
This is a notes app that was designed and written to learn node.js.

This app stores the "notes" locally in a file "notes-data.json" within the directory this app is in.
This app supports adding, removing and listing a single and all notes in the "database".

Required packages from NPM are lodash and yargs. The versions are listed in package.json file.

This will create a file 'notes-data.json' this .JSON file is the database used to store the notes.

USAGE -
  add --title="Title_of_Note" --body="The message the note has within"
  remove --title="Title_of_Note to remove"
  list (Lists all the notes inside of the database does not need any flags)
  get --title="Title_of_Note_To_Get" (Will print the suject and body of the message queried for.)
*/

//NPM installed packages
const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

//Custom created packages for this project
const notes = require('./notes.js');

//Command line argument work for ussage help.
const titleOptions = {
    describe: 'Title of the note.',
    demand: true,
    alias: 't'
};
/*
Using Yargs to parse through the commandline inputs into app.js. The implimetation
of yargs will let us be able to parse though the input without having to create our own parser.
*/
const argv = yargs.command('add','Add a new note', {
  title: titleOptions, //See constant title options directly above. Used multiple times to remove redundancy.
  body: {
    describe: 'The message of the note',
    demand: true,
    alias: 'b'
  }
})
.command('list', 'List all notes inside of the databse')
.command('get', 'Read a single note', {
  title: titleOptions
})
.command('remove', 'Remove a note from the databse', {
    title: titleOptions
})
.help()
.argv;

var command = argv._[0];

/*
Commands to add, List, Get and Remove a note from the database.
These commands all link to the notes.js file were all of the Commands
addNote, getAll, getNote and removeNote are all implimented. All commands are
implimented inside of the notes.js file.
*/
if (command == 'add'){
  var note = notes.addNote(argv.title, argv.body);
  if(note){ //Check to see if the note is a new note, if new add it.
    notes.printNote(note);
  } else{ //otherwise do not add it, can not have two notes with same subject.
    console.log("Note subject already exists. Note not added");
  }
} else if (command == 'list'){ //Prints ALL notes.
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} notes.`);
  allNotes.forEach((note) => notes.printNote(note));

} else if (command == 'get'){ //This will get ONE specific note.
  note = notes.getNote(argv.title);
  notes.printNote(note);

} else if (command == 'remove'){ //Remove one note by the subject lookup.
  var rc = notes.removeNote(argv.title);
  if(rc){
    console.log(`Note ${argv.title} removed.`);
  } else{
    console.log(`Removal failed.`);
  }
} else{
  console.log('Command not reconginzed');
}
