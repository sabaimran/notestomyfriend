function grid() {
    const sNotes = getNotesSortedByDateTime();
    var container = document.createElement('div');
    container.id = "main";
    container.className = "container";

    for (var i = 0; i < sNotes.length; i++) {

        const note = sNotes[i];

        // Construct (parent) row
        var row = document.createElement('div');
        row.className = "text-"+note.author+" text-row";
        row.id = "text" + i;

        // Add author element
        var author = document.createElement('div');
        author.innerHTML = note.author;
        author.className = "text-author";
        row.appendChild(author);

        // Add the text data
        var text = document.createElement('div');
        text.innerHTML = "<pre>" + note.text + "</pre>";
        text.className = "text-data";
        row.appendChild(text);

        // Add the date
        var date = document.createElement('div');
        date.innerHTML = getPrettyDate(note.date);
        date.className = "text-date";
        row.appendChild(date);

        container.appendChild(row);
    }

    return container;
}

function getPrettyDate(date) {
    var parsedDate = new Date(Date.parse(date));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()+1}-${parsedDate.getDate()}`;
}

function getNotesSortedByDateTime() {
    return notes.sort((a,b) => (Date.parse(a.date)) < (Date.parse(b.date)) ? 1 : -1);
}

// and you should use 
document.getElementById('notes-container').appendChild(grid());
