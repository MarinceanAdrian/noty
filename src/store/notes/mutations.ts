import { Note, NotesState } from "../../types/types";

export default {
  setNotes(state: NotesState, payload: Note[]) {
    state.notes = payload;
  },
  createNote(state: NotesState, payload: Note) {
    state.notes.push(payload);
  },

  toggleFavourite(state: NotesState, id: number) {
    const updatedNotes = [...state.notes].map((note) => {
      if (note.id === id) {
        return {
          ...note,
          isFavourite: !note.isFavourite,
        };
      }
      return note;
    });
    state.notes = updatedNotes;
  },
  editNote(state: NotesState, payload: Note) {
    state.notes = state.notes.map((note) => {
      if (+note.id === +payload.id) {
        return {
          ...note,
          ...payload,
        };
      }
      return note;
    });
  },

  setFilterTerm(state: NotesState, payload: string) {
    state.filterTerm = payload;
  },

  deleteNote(state: NotesState, payload: number) {
    state.notes = state.notes.filter((note) => note.id !== payload);
    console.log(state.notes);
  },
};
