export interface Note {
  id: number;
  hashtag: string;
  color: string;
  lastUpdate: string;
  isFavourite: boolean;
  text: string;
}

export interface NotesState {
  notes: Note[];
  filterTerm: string;
}
