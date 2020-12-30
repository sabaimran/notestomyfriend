// Global variable to maintain state of the whitelisted tags.
var whitelist = new Set();

// Global variable containing the list of all notes sorted by DateTime.
const sNotes = getNotesSortedByDateTime();

// Global variable holding the list of tags mapped to id's.
var tagsMap = {};

/**
 * Initialize the notes layout on first load.
 */
function initNotes() {
    // Notes container
    var container = document.createElement('div');
    container.id = "main";
    container.className = "container";

    // Tag buttons container
    var tagsContainer = document.createElement('div');
    tagsContainer.id = "tags-container";
    tagsContainer.className = "tags-container";

    for (var i = 0; i < sNotes.length; i++) {

        const note = sNotes[i];

        var row = getRowElement(note, i);

        // Process tags
        var tags = note.tag?.split(',');
        if (tags) {
            tags.forEach(tag => {
                if (tag in tagsMap) 
                {
                    tagsMap[tag].push(i);
                } else {
                    tagsMap[tag] = [i];
                }
            });
        }
        container.appendChild(row);
    }

    document.getElementById('notes-container').appendChild(container);

    for (let key in tagsMap) {
        var button = document.createElement('button');
        button.className = "tag-button";
        button.innerHTML = key;

        tagsContainer.appendChild(button);
    }

    document.getElementById('tag-buttons').appendChild(tagsContainer);
}

/**
 * Render only wanted notes as visible in the notes layout after subsequent changes.
 */
function renderNotesInvisible() {
    var showAll = whitelist.size == 0;

    // There is some non-zero set of whitelisted tags.
    for (var i = 0; i < sNotes.length; i++) {
        const note = sNotes[i];
        var tags = note.tag?.split(',');

        if (showAll) {
            document.getElementById("text" + i).style.visibility = "visible";
            continue
        }

        // Set to invisible unless we find a tag matching the filter of whitelisted tags.
        document.getElementById("text" + i).style.visibility = "hidden";
        if (tags) {
            console.log(tags);
            for (let tag of tags) {
                console.log(whitelist.has(tag));
                if (whitelist.has(tag)) {
                    document.getElementById("text" + i).style.visibility = "visible";
                    break
                }
            }
        }
    }
}

/**
 * Filter out notes whose tags are not in the whitelist; filter in notes whose tags are on the whitelist.
 */
function renderNotes() {
    whitelist.add("self-improvement");
    var showAll = whitelist.size == 0;
    var containerElement = document.getElementById("main");
    showIds = new Set();

    // Get all ids for notes that are included in the tag whitelist.
    for (let tag of whitelist.keys()) {
        var ids = tagsMap[tag];
        ids.forEach(id => {
            if (!showIds.has(id)) {
                showIds.add(id);
            }
        });
    }

    for (var i = 0; i < sNotes.length; i++) {
        element = document.getElementById("text"+i);

        // If this element is not in our whitelist, remove it. If it is, show it.
        if (!showAll && !showIds.has(i)) {
            const note = sNotes[i];
            if (element !== null) {
                element.remove();
            }
        } else {
            if (element == null) {
                var row = getRowElement(note, i);
                containerElement.appendChild(row);
            }
        }
    }
}

/**
 * Given a note object, constructs the corresponding row element.
 * @param {The note to wrap in the row element} note 
 * @param {The index} i
 */
function getRowElement(note, i) {

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
    
    return row;
}

/**
 * Given a date object, renders it such that in YYYY-MM-DD format.
 * @param {The date} date 
 */
function getPrettyDate(date) {
    var parsedDate = new Date(Date.parse(date));
    return `${parsedDate.getFullYear()}-${parsedDate.getMonth()+1}-${parsedDate.getDate()}`;
}

/**
 * Sorts the full list of notes by DateTime.
 */
function getNotesSortedByDateTime() {
    return notes.sort((a,b) => (Date.parse(a.date)) < (Date.parse(b.date)) ? 1 : -1);
}

// Run client-side processes.
initNotes();
renderNotes();