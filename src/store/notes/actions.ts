import { Note } from "../../types/types";
import { ActionContext } from "vuex";
const URL =
  "https://noty-vue-default-rtdb.europe-west1.firebasedatabase.app/notes.json";

async function sendHttp(method: string, payload?: Note | null, id?: string) {
  const response = await fetch(
    id
      ? `https://noty-vue-default-rtdb.europe-west1.firebasedatabase.app/notes/${id}.json`
      : URL,
    {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(responseData.message || "Failed to fetch!");
    throw error;
  }
}

async function fetchNotes() {
  const response = await fetch(URL);
  const responseData = await response.json();
  if (!response.ok) {
    const error = new Error(responseData.message || "Failed to fetch!");
    throw error;
  }
  return responseData;
}

export default {
  async setNotes(context: ActionContext) {
    let notes = [];
    const firebaseNotes = await fetchNotes();
    for (const note in firebaseNotes) {
      notes.push(firebaseNotes[note]);
    }

    context.commit("setNotes", notes);
  },
  async createNote(context: ActionContext, payload: Note) {
    await sendHttp("POST", payload);
    context.commit("createNote", payload);
  },
  async toggleFavourite(context: ActionContext, id: number) {
    // update in firebase also
    const firebaseNotes = await fetchNotes();

    for (const note in firebaseNotes) {
      if (+firebaseNotes[note].id === +id) {
        const updatedNote = {
          ...firebaseNotes[note],
          isFavourite: !firebaseNotes[note].isFavourite,
        };
        await sendHttp("PUT", updatedNote, note);
      }
    }
    context.commit("toggleFavourite", id);
  },
  async editNote(context: ActionContext, payload: Note) {
    let noteId = null;
    const firebaseNotes = await fetchNotes();

    for (const note in firebaseNotes) {
      if (+firebaseNotes[note].id === +payload.id) {
        noteId = note;
      }
    }
    console.log("noteId", noteId);
    await sendHttp("PUT", payload, noteId as string);

    context.commit("editNote", payload);
  },
  setFilterTerm(context: ActionContext, payload) {
    context.commit("setFilterTerm", payload);
  },
  async deleteNote(context: ActionContext, payload: number) {
    let noteId = null;
    const firebaseNotes = await fetchNotes();

    for (const note in firebaseNotes) {
      if (+firebaseNotes[note].id === +payload) {
        noteId = note;
      }
    }
    await sendHttp("DELETE", null, noteId as string);
    context.commit("deleteNote", payload);
  },
  registerNotes(context: ActionContext, payload) {},
};
