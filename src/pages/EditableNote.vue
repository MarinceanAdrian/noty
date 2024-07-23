<template>
  <div class="notes-container">
    <textarea
      class="notebook-textarea"
      v-model="updatedNoteText"
      :style="{ 'background-color': route.query.color }"
    >
    </textarea>
    <div class="actions">
      <button class="btn" @click="editNote(note)">Save modifications</button>
      <button class="btn btn-error" @click="router.replace('/notes')">
        Discard modifications
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, onMounted, ref, Ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Note } from "../types/types";

let timer;

const store = useStore();
const router = useRouter();
const route = useRoute();

const note = computed(() =>
  store.getters["notes/getNotes"].find(
    (note: Note) => note.id === +route.params.id,
  ),
);
const updatedNoteText: Ref<string> = ref("");

function editNote(note: Note) {
  const updatedNote = {
    ...note,
    text: updatedNoteText.value,
  };
  store.dispatch("notes/editNote", updatedNote);
  router.replace("/notes");
}

onMounted(() => {
  timer = setTimeout(() => {
    updatedNoteText.value = route.query.text;
    clearTimeout(timer);
  }, 500);
});
</script>
<style scoped>
.notes-container {
  max-width: 600px;
  margin: 3rem auto;
}

.notebook-textarea {
  width: 100%;
  height: 70vh;
  padding-left: 20px;
  border: 2px solid #ccc;
  border-radius: 0.3rem;
  background: repeating-linear-gradient(
    white,
    white 34px,
    #ccc 34px,
    #ccc 36px
  );
  font-size: 18px;
  line-height: 36px;
  resize: none;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #333;
  position: relative;
  /* overflow: hidden; */
}

.notebook-textarea:focus {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.actions {
  display: flex;
  gap: 2rem;
}

button {
  margin: 0;
}
</style>
