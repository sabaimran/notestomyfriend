console.log(notes);

function grid() {
    var container = document.createElement('div');
    container.id = "main";
    container.className = "container";

    for (var i = 0; i < notes.length; i++) {

        const note = notes[i];

        var row = document.createElement('div');
        row.className = "text-"+note.author;
        row.id = "text" + i;

        var date = document.createElement('div');
        date.innerHTML = (new Date(Date.parse(note.date))).getDate();
        row.appendChild(date);

        var author = document.createElement('div');
        author.innerHTML = note.author;
        row.appendChild(author);

        var text = document.createElement('div');
        text.innerHTML = note.text;
        row.appendChild(text);

        container.appendChild(row);
    }

    return container;
}

console.log(grid());

// and you should use 
document.getElementById('notes-container').appendChild(grid());
