import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    query,
    get,
    remove,
    get,
    addNewNote,
    update,
    addNew,
}

function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}




function update(newNote) {
    return storageService.put(NOTES_KEY, newNote)
}

function addNew(note) {
    note.isPinned = false
    return storageService.post(NOTES_KEY, note)
}


function addNewNote(note, isHardCoded = false) {
    if (note.type === 'textCmp') {
        note.info = { title: note.title, txt: note.value }
    } else if (note.type === 'listCmp') {
        var arrayTodo = note.value.split(',')
        for (var i = 0; i < arrayTodo.length; i++) {
            arrayTodo[i] = { txt: arrayTodo[i] }
        }
        note.info = { title: note.title, todos: arrayTodo }
    } else if (note.type === 'imgCmp') {
        note.info = { title: note.title, url: note.value }
        note.style = { bgc: 'bgc12' }
        if (isHardCoded) {
            note.style.bgc = 'bgc' + utilService.getRandomInt(1, 12)
            return note
        }
        return addNew(note)
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            // addNewNote({
            //     id: 'w65e2',
            //     title: "sport today",
            //     value: "Run 4km",
            //     type: 'textCmp'
            // },
            //     true

            // ),
            // addNewNote({
            //     id: 'fdvdfs',
            //     title: "Movie",
            //     value: " Creed,Champions",
            //     type: 'textCmp',
            //     isPinned: true,
            // },
            //     true

            // ),
            addNewNote({
                id: 'svsd45',
                title: 'time to Vacation',
                value: 'https://img.mako.co.il/2022/04/11/BaliIndonesia_MakoTrip_Apr2022_1_autoOrient_i.jpg',
                type: 'imgCmp',
                
            },
                true

            )
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)

}