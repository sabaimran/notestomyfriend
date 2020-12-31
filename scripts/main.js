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

    // Add buttons with callback functions.
    for (let key in tagsMap) {
        var button = document.createElement('button');
        button.className = "inactive-tag";
        button.id = "tag-button-"+key;
        button.innerHTML = key;
        button.addEventListener('click', function(){
            updateFilter(key);
            toggleColor(key);
        });

        tagsContainer.appendChild(button);
    }

    document.getElementById('tag-buttons').appendChild(tagsContainer);
}

/**
 * Given a tag, remove it from the filter if it's currently activated, or add it if it is not.
 * @param {The tag that should be toggled} tag 
 */
function updateFilter(tag) {
    console.log(tag);
    if (whitelist.has(tag)) {
        whitelist.delete(tag);
    } else {
        whitelist.add(tag);
    }
    renderNotes();
}

/**
 * For a given button, toggle its color.
 * @param {The id of the button element} buttonId
 * @param {The tag that should be toggled} tag
 */
function toggleColor(key) {
    var button = document.getElementById("tag-button-"+key);
    if (whitelist.has(key)) {
        button.className = "active-tag";
    } else {
        button.className = "inactive-tag";
    }
}

/**
 * Filter out notes whose tags are not in the whitelist; filter in notes whose tags are on the whitelist.
 */
function renderNotes() {
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
                note = sNotes[i];
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