console.log(notes);

function grid() {
    var container = document.createElement('div');
    container.id = "main";
    container.className = "container";

    for (var i = 0; i < notes.length; i++) {

        const note = notes[i];

        var row = document.createElement('div');
        row.className = "text-"+note.author+" text-row";
        row.id = "text" + i;

        var author = document.createElement('div');
        author.innerHTML = note.author;
        author.className = "text-author";
        row.appendChild(author);

        var text = document.createElement('div');
        text.innerHTML = note.text;
        text.className = "text-data";
        row.appendChild(text);

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

console.log(grid());

// and you should use 
document.getElementById('notes-container').appendChild(grid());
