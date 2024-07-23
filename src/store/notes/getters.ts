import { NotesState } from "../../types/types";

export default {
  getNotes(state: NotesState) {
    return state.notes;
  },
  hasNotes(state: NotesState) {
    return state.notes && state.notes.length > 0;
  },
  getHashtags(state: NotesState) {
    return [...state.notes].map((note) => note.hashtag);
  },
  getFilterHashtag(state: NotesState) {
    return state.filterTerm;
  },
};
