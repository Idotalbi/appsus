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

function addNew(note) {
    return storageService.post(NOTES_KEY, note)
}


function update(newNote) {
    return storageService.put(NOTES_KEY, newNote)
}


function addNewNote(note, isHardCoded = false) {
    if (note.type === 'textCmp') {
        note.info = { title: note.title, txt: note.value }
    }
    if (isHardCoded) {
        return note
    }
    return addNew(note)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes = [
            addNewNote({
                id: 'w65e2',
                title: "sport today",
                value: "Run 4km",
                type: 'textCmp'
            },
                true

            )
        ]
    }
    utilService.saveToStorage(NOTES_KEY, notes)

}