import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"


const NOTES_KEY = 'notesDB'
_createNotes()

export const notesService = {
    query,
    get,
    remove,
    update,
    save,
    getEmptyNote,
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

function update(note) {
    return storageService.put(NOTES_KEY, note)
}

function save(note) {
    note.isPinned = false
    return storageService.post(NOTES_KEY, note)
}

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        type: 'note-txt',
        title: '',
        isPinned: false,
        info: {
            txt: '',
        },
        bgColor: '#fff475'
        
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTES_KEY)
    if (!notes || !notes.length) {
        notes =
            [
                {
                    id: 'n101',
                    title: 'Fullstack',
                    createdAt: 1112222,
                    type: 'note-txt',
                    isPinned: true,
                    info: {
                        txt: 'Fullstack Me Baby!',
                    },
                    bgColor: '#00d',
                },
                {
                    id: 'n102',
                    title: 'BOBiii',
                    type: 'note-img',
                    isPinned: false,
                    info: {
                        url: 'https://img.mako.co.il/2022/04/11/BaliIndonesia_MakoTrip_Apr2022_1_autoOrient_i.jpg',
                        title: 'Bobi and Me',
                    },
                    bgColor: '#00d',
                },
                {
                    id: 'n103',
                    title: 'Get my stuff together',
                    type: 'note-todo',
                    isPinned: false,
                    info: {
                        todos: [
                            { txt: 'Driving liscence', doneAt: null, id: 252 },
                            { txt: 'Coding power', doneAt: 187111111, id: 2578 },
                        ],
                    },
                    bgColor: '#00d',
                },
                {
                    id: 'n103',
                    title: 'learn vue',
                    type: 'note-video',
                    isPinned: false,
                    info: {
                        url: `https://www.youtube.com/watch?v=qZXt1Aom3Cs`,
                      },
                      bgColor: '#bdea8a',
                },
                {
                    id: 'n103',
                    title: 'Final Sprint',
                    type: 'note-video',
                    isPinned: false,
                    info: {
                        url: `https://www.youtube.com/watch?v=cEItmb_a20M`,
                      },
                      bgColor: '#add8e6',
                },
        
            ]

        utilService.saveToStorage(NOTES_KEY, notes)
    }
    return notes
}